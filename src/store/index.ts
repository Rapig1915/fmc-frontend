import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import rootReducer from './reducers';
import apiActionCreator from './middleware/apiActionCreator';

const persistConfig = {
  key: 'fmc',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware: Middleware[] = [thunk, apiActionCreator];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export { store, persistor };
