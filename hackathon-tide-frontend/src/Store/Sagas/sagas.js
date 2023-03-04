import { all } from 'redux-saga/effects';
import LoginWatcherSaga from './LoginWatcherSaga';
// import TabledataWatcherSaga from './TabledataWatcherSaga'
export default function* rootSage() {
    yield all([
        // TabledataWatcherSaga(),
        LoginWatcherSaga(),
    ])
}