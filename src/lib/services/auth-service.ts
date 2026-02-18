import { api } from '$lib/api-client.svelte';

interface LoginResponse {
    token: string,
    user: User
}

export const AuthService = {
    login: (data: { email: string, password: string }) =>
        api.post<LoginResponse>('/login', data),

    logout: () =>
        api.post('/logout')
};