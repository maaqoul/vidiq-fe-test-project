import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '../../shared/components/Spinner';

const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spinner size='large' />}>{component()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
