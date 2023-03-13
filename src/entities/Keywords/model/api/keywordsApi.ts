import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IKeywordItem } from '../types';

export const keywordsApi = createApi({
  reducerPath: 'keywordsApi',
  tagTypes: ['Keywords'],
  baseQuery: fetchBaseQuery({
    // TODO: FIX ME! use process.env variables?
    baseUrl: 'http://localhost:3004/',
  }),
  endpoints: (build) => ({
    getKeywords: build.query<IKeywordItem[], number | undefined | void>({
      query: (limit) => `keywords${limit != null ? `?_limit=${limit}` : ''}`,
      providesTags: [{ type: 'Keywords', id: 'List' }],
    }),
  }),
});

export const { useGetKeywordsQuery, useLazyGetKeywordsQuery } = keywordsApi;

export const useKeywordsQuery = keywordsApi.endpoints.getKeywords.useQuery;
