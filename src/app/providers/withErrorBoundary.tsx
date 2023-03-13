import { type ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const withErrorBoundary = (component: () => ReactNode) => () =>
  <ErrorBoundary>{component()}</ErrorBoundary>;

export default withErrorBoundary;
