import { EnvPropEnum } from './enums';

declare const window: Window &
  typeof globalThis & {
    env: unknown;
  };

export type IProcessEnv = {
  [key in EnvPropEnum]: string;
} & typeof window;
