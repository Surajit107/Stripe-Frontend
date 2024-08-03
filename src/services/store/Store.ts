import createSagaMiddleware from 'redux-saga';
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../reducers/AuthSlice";
import SubscriptionSlice from "../reducers/SubscriptionSlice";
import rootSaga from '../sagas/root/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const Store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        subscriptionSlice: SubscriptionSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default Store;