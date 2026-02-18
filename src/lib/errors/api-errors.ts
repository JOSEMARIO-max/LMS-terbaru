export class ApiError extends Error {
    public statusCode: number;
    public response?: any;

    constructor(message: string, statusCode: number, response?: any) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.response = response;
    }
}

export class ValidationError extends ApiError {
    public errors: Record<string, string[]>;

    constructor(message: string, errors: Record<string, string[]>, response?: any) {
        super(message, 422, response);
        this.name = 'ValidationError';
        this.errors = errors;
    }

    // Helper untuk get error message pertama dari field
    getFirstError(field: string): string | undefined {
        return this.errors[field]?.[0];
    }

    // Helper untuk get semua error dari field
    getFieldErrors(field: string): string[] {
        return this.errors[field] || [];
    }

    // Helper untuk check apakah field punya error
    hasError(field: string): boolean {
        return !!this.errors[field]?.length;
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = 'Unauthorized', response?: any) {
        super(message, 401, response);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = 'Forbidden', response?: any) {
        super(message, 403, response);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = 'Resource not found', response?: any) {
        super(message, 404, response);
        this.name = 'NotFoundError';
    }
}

export class ServerError extends ApiError {
    constructor(message: string = 'Internal server error', response?: any) {
        super(message, 500, response);
        this.name = 'ServerError';
    }
}

export class NetworkError extends Error {
    constructor(message: string = 'Network request failed') {
        super(message);
        this.name = 'NetworkError';
    }
}