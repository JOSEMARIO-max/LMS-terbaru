import { goto } from "$app/navigation";
import { authStore } from "./stores/auth-store.svelte";
import {
    ApiError,
    ValidationError,
    UnauthorizedError,
    NotFoundError,
    ServerError,
    NetworkError,
    ForbiddenError
} from "./errors/api-errors";
import type { PaginatedResponse } from "./types/api-type";

const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
    params?: Record<string, any>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_URL) {
        this.baseUrl = baseUrl;
    }

    private getAuthHeaders(): HeadersInit {
        const token = authStore.token;
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { skipAuth = false, ...fetchOptions } = options;

        const body = (fetchOptions as RequestInit).body;
        const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

        const headers: HeadersInit = {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(!skipAuth && this.getAuthHeaders()),
            ...fetchOptions.headers
        };

        if (!isFormData) {
            (headers as Record<string, string>)["Content-Type"] = "application/json";
        }

        const finalOptions: RequestInit = {
            ...fetchOptions,
            headers,
            credentials: skipAuth ? "omit" : "include"
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, finalOptions);

            if (response.status === 401) {
                authStore.clear();
                goto("/login");

                const errorData = await response.json().catch(() => ({ error: "Unauthorized" }));
                throw new UnauthorizedError(errorData.error, errorData);
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    error: "Request failed"
                }));

                // Validation error (422) dengan details
                if (response.status === 422 && errorData.details) {
                    throw new ValidationError(
                        errorData.error || "Validation failed",
                        errorData.details,
                        errorData
                    );
                }

                if (response.status === 403) throw new ForbiddenError(errorData.error, errorData);
                if (response.status === 404) throw new NotFoundError(errorData.error, errorData);
                if (response.status >= 500) throw new ServerError(errorData.error, errorData);

                throw new ApiError(
                    errorData.error || `HTTP ${response.status}`,
                    response.status,
                    errorData
                );
            }

            // Handle 204 No Content (DELETE response)
            const contentLength = response.headers.get("content-length");
            if (response.status === 204 || contentLength === "0") {
                return null as T;
            }

            // Return data langsung tanpa wrapper
            const data: T = await response.json();
            return data;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw new NetworkError(
                    "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
                );
            }

            if (error instanceof ApiError || error instanceof NetworkError) {
                throw error;
            }

            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }

    async get<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const { params, ...requestOptions } = options;

        let url = endpoint;
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += (endpoint.includes('?') ? '&' : '?') + queryString;
            }
        }

        return this.request<T>(url, { ...requestOptions, method: "GET" });
    }

    async post<T = unknown>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: data !== undefined ? JSON.stringify(data) : undefined
        });
    }

    async put<T = unknown>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: data !== undefined ? JSON.stringify(data) : undefined
        });
    }

    async patch<T = unknown>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: data !== undefined ? JSON.stringify(data) : undefined
        });
    }

    async delete<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    async getPaginated<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<PaginatedResponse<T>> {
        const { params, ...requestOptions } = options;

        let url = endpoint;
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += (endpoint.includes('?') ? '&' : '?') + queryString;
            }
        }

        // getPaginated sudah return format {data, meta}
        return this.request<PaginatedResponse<T>>(url, {
            ...requestOptions,
            method: "GET"
        });
    }

    async upload<T = unknown>(
        endpoint: string,
        formData: FormData,
        options: RequestOptions = {}
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: formData
        });
    }
}

export const api = new ApiClient();