import axios from "axios";

export interface LonginRequest {
    username: string;
    password: string;
}

export interface UserRegistrationRequest {
    name: string;
    username: string;
    password: string;
}

export interface TokenRefreshRequest {
    refreshToken: string;
}

export interface AuthResponse {
    name: string;
    accessToken: string;
    refreshToken: string;
}

const AUTH_API_URL = 'http://localhost:8194/api/auth';

const AuthService = {
    login: async (request: LonginRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/login`, request);
        return response.data;
    },
    registerUser: async (request: UserRegistrationRequest): Promise<void> => {
        await axios.post(`${AUTH_API_URL}/register`, request);
    },
    refreshToken: async (request: TokenRefreshRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/refresh/access-token`, request);
        return response.data;
    },
    logout: async (): Promise<void> => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            await axios.post(`${AUTH_API_URL}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }
    }
}
export default AuthService;