import { browser } from '$app/environment';
import type { User } from '$lib/types/user-type';

const STORAGE_KEYS = {
    USER: 'auth:user',
    TOKEN: 'auth:token'
} as const;

class AuthStore {
    user = $state<User | null>(null);
    token = $state<string | null>(null);
    private isHydrated = false;

    constructor() {
        if (!browser) return;

        this.loadFromStorage();
        this.isHydrated = true;
        this.listenToStorageChanges();
    }

    // Storage operations
    private loadFromStorage() {
        try {
            const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
            const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

            this.user = storedUser ? JSON.parse(storedUser) : null;
            this.token = storedToken;
        } catch {
            this.user = null;
            this.token = null;
        }
    }

    private saveToStorage() {
        if (!this.isHydrated) return;

        try {
            if (this.user && this.token) {
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.user));
                localStorage.setItem(STORAGE_KEYS.TOKEN, this.token);
            } else {
                localStorage.removeItem(STORAGE_KEYS.USER);
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
            }
        } catch { }
    }

    private listenToStorageChanges() {
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEYS.USER) {
                try {
                    this.user = e.newValue ? JSON.parse(e.newValue) : null;
                } catch {
                    this.user = null;
                }
            }

            if (e.key === STORAGE_KEYS.TOKEN) {
                this.token = e.newValue;
            }
        });
    }

    // Public methods
    setAuth(user: User, token: string) {
        this.user = user;
        this.token = token;
        this.saveToStorage();
    }

    clear() {
        this.user = null;
        this.token = null;
        this.saveToStorage();
    }

    // Getters
    get isAuthenticated(): boolean {
        return !!this.user && !!this.token;
    }
    // Tambahkan di bagian Getters
    get roles(): string[] {
        return this.user?.roles ?? [];
    }

    // get permissions(): string[] {
    //     return this.user?.permissions ?? [];
    // }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }

    hasAnyRole(roles: string[]): boolean {
        return roles.some(r => this.roles.includes(r));
    }
}

export const authStore = new AuthStore();