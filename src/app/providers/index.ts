import compose from 'compose-function';

import withApi from './withApi';
import withErrorBoundary from './withErrorBoundary';
import withRouter from './withRouter';
import withThemeProvider from './withThemeProvider';

const withProviders = compose(withApi, withErrorBoundary, withThemeProvider, withRouter);

export default withProviders;
