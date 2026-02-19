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
        // Deteksi apakah body adalah FormData
        const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

        const headers: HeadersInit = {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(!skipAuth && this.getAuthHeaders()),
            ...fetchOptions.headers
        };

        // Otomatis set Content-Type ke JSON jika BUKAN FormData
        if (!isFormData && body !== undefined) {
            (headers as Record<string, string>)["Content-Type"] = "application/json";
        }

        const finalOptions: RequestInit = {
            ...fetchOptions,
            headers,
            credentials: skipAuth ? "omit" : "include"
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, finalOptions);

            // 1. Handle Unauthorized (401)
            if (response.status === 401) {
                authStore.clear();
                goto("/login");

                const errorData = await response.json().catch(() => ({ error: "Unauthorized" }));
                throw new UnauthorizedError(errorData.error, errorData);
            }

            // 2. Handle Error Responses
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    error: "Request failed"
                }));

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

            // 3. Handle 204 No Content (DELETE/PUT sukses tanpa body)
            const contentLength = response.headers.get("content-length");
            if (response.status === 204 || contentLength === "0") {
                return null as T;
            }

            return await response.json();
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

    /**
     * Helper untuk memproses body data (JSON vs FormData)
     */
    private serializeBody(data: any): BodyInit | undefined {
        if (data === undefined || data === null) return undefined;
        if (typeof FormData !== "undefined" && data instanceof FormData) return data;
        return JSON.stringify(data);
    }

    async get<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
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
            body: this.serializeBody(data)
        });
    }

    async put<T = unknown>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: this.serializeBody(data)
        });
    }

    async patch<T = unknown>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: this.serializeBody(data)
        });
    }

    async delete<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    async getPaginated<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<PaginatedResponse<T>> {
        return this.get<PaginatedResponse<T>>(endpoint, options);
    }
}

export const api = new ApiClient();