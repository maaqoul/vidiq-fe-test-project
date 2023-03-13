import compose from 'compose-function';

import withErrorBoundary from './withErrorBoundary';
// IMPORTANT NOTE: DANGER!!!
// Using this together with an existing Redux store will cause them to conflict with each other.
// If you are already using Redux, please follow the instructions as shown in the Getting Started guide.
// https://redux-toolkit.js.org/rtk-query/api/ApiProvider
// import withApi from './withApi';
import withReduxStore from './withReduxStore';
import withRouter from './withRouter';
import withThemeProvider from './withThemeProvider';

const withProviders = compose(withReduxStore, withErrorBoundary, withThemeProvider, withRouter);

export default withProviders;
