import { createStore,applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

//本地持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
    key: 'root',
    // storage: storage,
    storage,
    blacklist: ['error']
};
const persistedReducer = persistReducer(persistConfig, reducers);//数据持久化
const store = createStore(persistedReducer, applyMiddleware(...middleware));
persistStore(store);//数据持久化

sagaMiddleware.run(rootSaga);

export default store;
