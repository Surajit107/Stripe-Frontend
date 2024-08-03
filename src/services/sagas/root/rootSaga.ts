import { all } from 'redux-saga/effects';
import watchAuthSaga from '../authSaga';
import watchSubscriptionSaga from '../subscriptionSaga';

export default function* rootSaga() {
    yield all([
        watchAuthSaga(),
        watchSubscriptionSaga(),
    ]);
};