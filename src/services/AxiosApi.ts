import axios from 'axios';
import AuthService from './AuthService';

const axiosApi = axios.create();

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const isTokenExpiredSoon = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;
        const now = Date.now();
        const oneMinute = 60 * 1000;
        return expiry - now < oneMinute;
    } catch (e) {
        return true;
    }
};

axiosApi.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (token && isTokenExpiredSoon(token) && refreshToken && !isRefreshing) {
            isRefreshing = true;
            try {
                const response = await AuthService.refreshToken({refreshToken});
                localStorage.setItem('access_token', response.accessToken);
                localStorage.setItem('refresh_token', response.refreshToken);

                token = response.accessToken;
                processQueue(null, token);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('name');
                window.location.href = '/login';
            } finally {
                isRefreshing = false;
            }
        }

        if (token && config.headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axiosApi(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                const response = await AuthService.refreshToken({refreshToken});
                localStorage.setItem('access_token', response.accessToken);
                if (response.refreshToken) {
                    localStorage.setItem('refresh_token', response.refreshToken);
                }

                axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + response.accessToken;

                processQueue(null, response.accessToken);
                return axiosApi(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('name');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
