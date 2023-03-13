type ITrendingKeywordsId = number;
type ITrendingKeywordsIds = ITrendingKeywordsId[];

interface ITrendingKeywordsIdsMap {
  [key: ITrendingKeywordsId]: boolean;
}
interface ITrendingKeywordsState {
  isLoadingTrendingKeywordsIds: boolean;
  isLoadingErrorTrendingKeywords: boolean;
}

export type {
  ITrendingKeywordsId,
  ITrendingKeywordsIds,
  ITrendingKeywordsIdsMap,
  ITrendingKeywordsState,
};
