import { EnvPropEnum } from './enums';

export type IProcessEnv = {
  [key in EnvPropEnum]: string;
} & typeof window;
