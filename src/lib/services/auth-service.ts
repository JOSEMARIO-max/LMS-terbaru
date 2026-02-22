import { api } from '$lib/api-client.svelte';
import { authStore } from '$lib/stores/auth-store.svelte'; // Import store kamu
import type { User } from '$lib/types/user-type';

interface LoginResponse {
    token: string,
    user: User
}

export const AuthService = {
    login: async (data: { email: string; password: string }) => {
        const response = await api.post<LoginResponse>('/login', data);
        
        // --- SIMPAN KE LOCAL STORAGE & STATE DI SINI ---
        authStore.setAuth(response.user, response.token);
        
        return response;
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } finally {
            // --- HAPUS DARI LOCAL STORAGE & STATE ---
            authStore.clear();
        }
    }
};