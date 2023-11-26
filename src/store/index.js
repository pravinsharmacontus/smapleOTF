import { createStore, applyMiddleware } from 'redux';
import rootSaga from './sagas';
import reduxSaga from 'redux-saga';
import rootReducer from './reducer';
import { logger } from 'redux-logger';

const reduxSagaMiddleware = reduxSaga();
let storeConfig = [reduxSagaMiddleware];
    storeConfig = [...storeConfig, logger];

const store = createStore(rootReducer, applyMiddleware(...storeConfig));
reduxSagaMiddleware.run(rootSaga);
export default store;
