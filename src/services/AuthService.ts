import axios from "axios";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface TokenRefreshRequest {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

const AUTH_API_URL = 'http://localhost:8194/api/auth';

const AuthService = {
    login: async (request: LoginRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/login`, request);
        return response.data;
    },
    refreshToken: async (request: TokenRefreshRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/refresh/access-token`, request);
        return response.data;
    }
}
export default AuthService;