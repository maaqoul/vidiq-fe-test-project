import { type ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';

const withThemeProvider = (component: () => ReactNode) => () =>
  <ThemeProvider>{component()}</ThemeProvider>;

export default withThemeProvider;
