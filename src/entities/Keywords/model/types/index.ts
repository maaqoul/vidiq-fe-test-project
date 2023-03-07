export enum ECompetition {
  VERY_LOW = 'very low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very high',
}

export type IKeyItem = {
  id: number;
  keyword: string;
  search_volume: number;
  competition: ECompetition;
  overall_score: number;
};

export interface IColumnConfig {
  title: string;
  key: keyof IKeyItem;
}
