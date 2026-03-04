import axios from "axios";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

const AUTH_API_URL = 'http://localhost:8194/api/auth/login';

const AuthService = {
    login: async (loginRequest: LoginRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(AUTH_API_URL, loginRequest);
        return response.data;
    }
}
export default AuthService;