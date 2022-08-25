export interface ApiError {
    status_message: string;
    status_code: number;
}
export interface QueryOptions {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
}

export interface ResponseOptions {
    headers: { total_count: "X-Total-Count" }
}