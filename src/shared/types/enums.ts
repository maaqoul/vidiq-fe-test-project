export enum EnvPropEnum {
  PROTOCOL = 'PROTOCOL',
  BASE_URL = 'BASE_URL',
  API_REQUEST_KEYWORDS_URI = 'API_REQUEST_KEYWORDS_URI',
  API_REQUEST_TRENDING_KEYWORDS_URI = 'API_REQUEST_TRENDING_KEYWORDS_URI',
  AUTH_TOKEN = 'SESSION_COOKIE_NAME',
  REQUEST_MIN_TIME_OUT = 'REQUEST_MIN_TIME_OUT',
}

export enum ECompetition {
  VERY_LOW = 'very low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very high',
}

export enum ESortBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ISortDirection = typeof ESortBy;

// const enum Enum {
//   key1 = 'value1',
//   key2 = 'value2',
//   key3 = 'value3',
// }
// type EnumKeys = keyof typeof Enum;
// type EnumKeyFields = { [key in EnumKeys]: boolean };

// interface IEnumExtended extends EnumKeyFields {
//   KeyEx1: boolean;
//   KeyEx2: string;
// }
