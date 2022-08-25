import { BASE_API_URL } from "../Constants";
import { Keyword } from "../models/Keyword";
import { ApiError } from "./types";


function generateUrl(path: string): string {
    return `${BASE_API_URL}${path}`;
}

function throwCommonError(data: ApiError): Error {
    throw new Error(`${data.status_message} (error code: ${data.status_code})`);
}

async function handleApiCall(url: string): Promise<any> {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throwCommonError(data);
    }

    return data;
}

export function getKeywords(): Promise<Keyword[]> {
    const url = generateUrl('keywords');

    return handleApiCall(url);
}

export function getTrendingKeywords(): Promise<number[]> {
    const url = generateUrl('trending-keywords');

    return handleApiCall(url);
}