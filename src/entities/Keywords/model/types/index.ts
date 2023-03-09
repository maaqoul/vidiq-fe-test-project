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

export type IKeywordItem = {
  id: number;
  keyword: string;
  search_volume: number;
  competition: ECompetition;
  overall_score: number;
};

export type IKeywordKeys = keyof IKeywordItem;
export interface IColumnConfig {
  title: string;
  key: EKeywordKeys;
}

export type IKeywordByKeyMap = {
  [key in EKeywordKeys]: number;
};
