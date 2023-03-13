import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ITrendingKeywordsId } from '../types';

export const trendingKeywordsApi = createApi({
  reducerPath: 'trendingKeywordsApi',
  tagTypes: ['TrendingKeywordsIds'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004/',
  }),
  endpoints: (build) => ({
    getAllTrendingKeywordsIds: build.query<ITrendingKeywordsId[], void>({
      query: () => `trending-keywords`,
    }),
  }),
});

export const { useGetAllTrendingKeywordsIdsQuery, useLazyGetAllTrendingKeywordsIdsQuery } =
  trendingKeywordsApi;

export const useTrendingKeywordsQuery =
  trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.useQuery;
