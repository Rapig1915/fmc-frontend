import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Middleware } from 'redux';
import rootReducer from './reducers';

const persistConfig = {
  key: 'fmc',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
