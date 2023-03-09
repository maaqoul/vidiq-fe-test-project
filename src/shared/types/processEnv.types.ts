import { EProcessEnv } from './enums';

export type IProcessEnv = {
  [key in EProcessEnv]: string;
} & typeof window;
