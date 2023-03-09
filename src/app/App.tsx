import './styles/App.scss';

import Pages from '../pages';
import withProviders from './providers';

const App = () => {
  return (
    <div className='app'>
      <Pages />
    </div>
  );
};

export default withProviders(App);
