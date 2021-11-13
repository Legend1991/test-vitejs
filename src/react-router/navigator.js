import { createBrowserHistory as createHistory } from 'history';

const history = createHistory();

const navigator = {
  goToAbout() {
    history.push('/about');
  },
};

export default navigator;

export {
  history,
  navigator,
};
