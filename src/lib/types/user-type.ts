// interface User {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
// }

export interface User {
    id: number;
    name: string;
    email: string;
    profile?: {
        avatar: string | null;
        phone: string | null;
        bio: string | null;
    };
    roles: string[];
}

export interface LoginResponse {
    token: string;
    user: User;
}