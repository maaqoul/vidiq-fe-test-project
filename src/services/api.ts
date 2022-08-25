import { KEYWORDS_PER_PAGE } from "../Constants";
import { Keyword } from "../models/Keyword";
import { ApiError, QueryOptions, ResponseOptions } from "./types";

const { REACT_APP_BASE_API_URL: BASE_API_URL } = process.env;

function generateEndpoint(path: string): string {
    return `${BASE_API_URL}${path}`;
}

function throwCommonError(data: ApiError): Error {
    throw new Error(`${data.status_message} (error code: ${data.status_code})`);
}




async function handleApiCall<T, U extends Record<string, unknown> = {}>(url: string, options?: ResponseOptions): Promise<{ data: T } & U> {
    const response = await fetch(url);

    const data = await response.json() as T;

    if (!response.ok) {
        throwCommonError(data as unknown as ApiError);
    }

    return {
        data, ...(Object.entries(options?.headers ?? {})
            .reduce((accumulatedHeadersValues, currentEntry) =>
                ({ ...accumulatedHeadersValues, [currentEntry[0]]: response.headers.get(currentEntry[1]) }), {} as U))
    };
}


function generateQuery(url: string, options: QueryOptions): string {
    return `${url}?${Object.entries(options)
        .reduce((accumulatedParams, currentEntry) =>
            (`${accumulatedParams}${accumulatedParams.length ? '&' : ''}_${currentEntry[0]}=${currentEntry[1]}`), '')}`;
}

export function getKeywords(options?: QueryOptions): Promise<{ data: Keyword[], total_count: number }> {
    const url = generateQuery(generateEndpoint('keywords'), Object.entries({ ...options, page: options?.page ?? 1, limit: options?.limit ?? KEYWORDS_PER_PAGE })
        .reduce((accumulatedOptions, currentEntry) =>
            ({ ...accumulatedOptions, [currentEntry[0]]: currentEntry[1] }), {}));

    return handleApiCall<Keyword[], { 'total_count': number }>(url, { headers: { total_count: "X-Total-Count" } });
}

export function getTrendingKeywords(): Promise<{ data: number[] }> {
    const url = generateEndpoint('trending-keywords');

    return handleApiCall<number[]>(url);
}