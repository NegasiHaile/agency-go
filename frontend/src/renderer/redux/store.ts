import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';

import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const middlewareEnhancer = applyMiddleware(thunk, logger);

const persist = persistReducer(persistConfig, rootReducer);
const store = createStore(persist, middlewareEnhancer);
const persistor = persistStore(store);

export { store, persistor };
