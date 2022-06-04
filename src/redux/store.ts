import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';

import thunk from 'redux-thunk';
import authReducer from './reducers/auth-reducer';
import userReducer from './reducers/user-reducer';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
