import { ErrorBoundary } from './ErrorBoundary';

const withErrorBoundary = (component: () => React.ReactNode) => () =>
  <ErrorBoundary>{component()}</ErrorBoundary>;

export default withErrorBoundary;
