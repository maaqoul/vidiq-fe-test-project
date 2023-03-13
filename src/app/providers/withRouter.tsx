import { Suspense, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '../../shared/components/Spinner';

const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spinner size='large' />}>{component()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
