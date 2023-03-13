export enum EProcessEnv {
  PROTOCOL = 'PROTOCOL',
  BASE_URL = 'BASE_URL',
  API_REQUEST_KEYWORDS_URI = 'API_REQUEST_KEYWORDS_URI',
  API_REQUEST_TRENDING_KEYWORDS_URI = 'API_REQUEST_TRENDING_KEYWORDS_URI',
  AUTH_TOKEN = 'SESSION_COOKIE_NAME',
  REQUEST_MIN_TIME_OUT = 'REQUEST_MIN_TIME_OUT',
}

export type IProcessEnv = {
  [key in EProcessEnv]: string;
} & typeof window;

export type IScoreTagType = 'red' | 'yellow' | 'orange' | 'light-green' | 'green';
