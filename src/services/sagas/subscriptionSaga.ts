import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { CANCELSUB, GETSUBDETAILS, GETSUBSPLANS, PAYMENTSUCCESS, REQREFUND } from '../api/Api';
import {
    cancelSubFailure,
    cancelSubSuccess,
    getSubsPlansFailure,
    getSubsPlansSuccess,
    subDetailsFailure,
    subDetailsRequest,
    subDetailsSuccess,
    successPaymentFailure,
    successPaymentSuccess
} from '../reducers/SubscriptionSlice';
import { EncryptData } from '../../helper/EncryptDecrypt';
import { ActionType, CustomHeadersType, NetworkResppne } from '../../types/common';
import { PaymentSuccessParams } from '../../types/subscription';
import { UserDataResponse } from '../../types/auth';
import { AxiosResponse } from 'axios';
import { Subscription } from '../../types/subscription';
import { showToast } from '../../helper/Toast';


// getSubsPlans saga
export function* getSubsPlansSaga({ payload, type }: ActionType<CustomHeadersType>): Generator<CallEffect<AxiosResponse<NetworkResppne<Array<Subscription>>>> | PutEffect, void, any> {
    try {
        const response = yield call(GETSUBSPLANS, payload);
        const result: NetworkResppne<Array<Subscription>> = response.data;

        if (result.success) {
            yield put(getSubsPlansSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        yield put(getSubsPlansFailure(errorMessage));
    }
};

// getSubDetails saga
export function* getSubDetailsSaga({ payload, type }: ActionType<CustomHeadersType>): Generator<CallEffect<AxiosResponse<NetworkResppne<any>>> | PutEffect, void, any> {
    try {
        const response = yield call(GETSUBDETAILS, payload);
        const result: NetworkResppne<any> = response.data;

        if (result.success) {
            yield put(subDetailsSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        yield put(subDetailsFailure(errorMessage));
    }
};

// paymentSuccess saga
export function* paymentSuccessSaga({ payload, type }: ActionType<PaymentSuccessParams>): Generator<CallEffect | PutEffect, void, any> {
    try {
        const { _sessionID, header } = payload;
        const response = yield call(PAYMENTSUCCESS, { _sessionID, header });
        const result: NetworkResppne<UserDataResponse> = response.data;

        if (result.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            yield put(successPaymentSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        yield put(successPaymentFailure(errorMessage));
    }
};

// subPlanRefund saga
export function* subPlanRefundSaga({ payload, type }: ActionType<CustomHeadersType>): Generator<CallEffect, void, any> {
    try {
        const response = yield call(REQREFUND, payload);
        const result: any = response.data;

        if (result.success) {
            showToast({
                message: result?.message,
                type: 'success',
                durationTime: 3000,
                position: 'top-center',
            });
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        showToast({
            message: errorMessage,
            type: 'error',
            durationTime: 4000,
            position: 'top-center',
        });
    }
};

// cancelSub saga
export function* cancelSubSaga({ payload, type }: ActionType<CustomHeadersType>): Generator<CallEffect | PutEffect, void, any> {
    try {
        const response = yield call(CANCELSUB, payload);
        const result: any = response.data;

        if (result.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);
            showToast({
                message: result?.message,
                type: 'success',
                durationTime: 3000,
                position: 'top-center',
            });

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);

            yield put(subDetailsRequest(payload));
            yield put(cancelSubSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        yield put(cancelSubFailure(errorMessage));
    }
};

export default function* watchSubscriptionSaga() {
    yield takeLatest('subscriptionSlice/getSubsPlansRequest', getSubsPlansSaga);
    yield takeLatest('subscriptionSlice/successPaymentRequest', paymentSuccessSaga);
    yield takeLatest('subscriptionSlice/subDetailsRequest', getSubDetailsSaga);
    yield takeLatest('subscriptionSlice/subPlanRefundRequest', subPlanRefundSaga);
    yield takeLatest('subscriptionSlice/cancelSubRequest', cancelSubSaga);
}