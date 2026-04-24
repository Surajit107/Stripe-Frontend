import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import AuthSlice from "../slices/AuthSlice";
import SubscriptionSlice from "../slices/SubscriptionSlice";

export const Store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        subscriptionSlice: SubscriptionSlice,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;