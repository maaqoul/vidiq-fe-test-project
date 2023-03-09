import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IKeywordItem } from '../entities/Keywords/model/types';
import { ITrendingKeywordsIds } from '../entities/TrendingKeywords/model/types';

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
    getAllTrendingKeywordsIds: build.query<ITrendingKeywordsIds, void>({
      query: () => `trending-keywords`,
    }),
  }),
});

export const { useGetKeywordsQuery, useGetAllTrendingKeywordsIdsQuery } = keywordsApi;
