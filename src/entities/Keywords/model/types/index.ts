export enum ECompetition {
  VERY_LOW = 'very low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very high',
}

export enum ESortOrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export enum EColumnIndexKey {
  KEYWORD,
  SEARCH_VOLUME,
  COMPETITION,
  OVERALL_SCORE,
}

export enum EKeywordKeys {
  ID = 'id',
  KEYWORD = 'keyword',
  SEARCH_VOLUME = 'search_volume',
  COMPETITION = 'competition',
  OVERALL_SCORE = 'overall_score',
}

type IKeywordItem = {
  id: number;
  keyword: string;
  search_volume: number;
  competition: ECompetition;
  overall_score: number;
};

type IKeywordKeys = keyof IKeywordItem;

interface IColumnConfig {
  title: string;
  key: EKeywordKeys;
}

type IKeywordKeyByIndex = {
  [key in EKeywordKeys]: number;
};

interface IKeywordsState {
  isLoadingKeywords: boolean;
  isLoadingErrorKeywords: boolean;
  selectedPageNumber: number;
  selectedColumnIndex: EColumnIndexKey;
  selectedFieldName: EKeywordKeys; // Note: You can use Omit<EKeywordKeys, 'id'> type, but it will complicate the logic.
  sortOrderBy: ESortOrderBy;
  rowsLimitPerPage: number;
}

export type { IColumnConfig, IKeywordItem, IKeywordKeyByIndex, IKeywordKeys, IKeywordsState };
