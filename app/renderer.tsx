import React = require('react');
import ReactDom = require('react-dom');
import Accapp from './app';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import UserReducer from './Reducers/User/User';
import StockReducer from './Reducers/Stock/stock';
import Notifications from './Reducers/settings/notifications';
import SearchResultsReducer from './Reducers/search/searcheng';
import DetialsReducer from './Reducers/CompanyDetials/detials';
import RoutesReducer from './Reducers/routes/routeReducer';
import TillReducer from './Reducers/Till/Till';

const AllReducers = combineReducers({
  user: UserReducer,
  company: DetialsReducer,
  stocks: StockReducer,
  notifications: Notifications,
  search: SearchResultsReducer,
  routes: RoutesReducer,
  tills: TillReducer,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;

const action = type => store.dispatch(type);

class Main extends React.Component {
  render() {
    return (
      <div>
        <Accapp />
      </div>
    );
  }
}

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>,
  document.querySelector('main')
);
