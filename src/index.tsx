import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app-component/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';

// props may be removed, left just to keep the code structure for future reuse :)
const Root: React.FC<{
  store: typeof store;
}> = props => (
  <Provider store={props.store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
