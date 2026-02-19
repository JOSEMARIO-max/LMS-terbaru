export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[]; // Menyimpan data dari Spatie getRoleNames()
    permissions: string[];
}

export interface LoginResponse {
    token: string;
    user: User;
}