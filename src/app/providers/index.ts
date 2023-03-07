import compose from 'compose-function';
import withApi from './withApi';

// TODO: Add withRouter, etc.
const withProviders = compose(withApi);

export default withProviders;
