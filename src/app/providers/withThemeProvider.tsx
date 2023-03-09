import { ThemeProvider } from './ThemeProvider';

const withThemeProvider = (component: () => React.ReactNode) => () =>
  <ThemeProvider>{component()}</ThemeProvider>;

export default withThemeProvider;
