import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./Reducers";
import rootSage from "./Sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSage);

export default store;