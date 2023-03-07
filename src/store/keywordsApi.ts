import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IKeyItem } from '../entities/Keywords/model/types';
import { ITrendingKeywords } from '../entities/TrendingKeywords/model/types';

export const keywordsApi = createApi({
  reducerPath: 'keywordsApi',
  tagTypes: ['Keywords'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004/',
  }),
  endpoints: (build) => ({
    getKeywords: build.query<IKeyItem[], number | undefined | void>({
      query: (limit) => `keywords${limit != null ? `?_limit=${limit}` : ''}`,
      providesTags: [{ type: 'Keywords', id: 'List' }],
    }),
    getAllTrendingKeywords: build.query<ITrendingKeywords, void>({
      query: () => `trending-keywords`,
    }),
  }),
});

export const { useGetKeywordsQuery, useGetAllTrendingKeywordsQuery } = keywordsApi;
