import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

const withReduxStore = (component: () => ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>;

export default withReduxStore;
