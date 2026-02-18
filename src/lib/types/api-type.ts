// Base API Response
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
    meta?: PaginationMeta;
}

// Pagination Meta
export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
    path?: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        has_more: boolean;
    };
}

// Common Response Types (untuk reusability)
export type ApiSuccessResponse<T = unknown> = ApiResponse<T> & {
    success: true;
};

export type ApiErrorResponse = ApiResponse<never> & {
    success: false;
    errors?: Record<string, string[]>;
};