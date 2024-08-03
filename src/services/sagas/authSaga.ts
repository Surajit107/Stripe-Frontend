import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { LOGIN, SIGNUP } from '../api/Api';
import { AuthResponse, UserAuth_Props, AuthSuccessResponse } from '../../types/auth';
import { EncryptData } from '../../helper/EncryptDecrypt';
import { showToast } from '../../helper/Toast';
import {
    loginSuccess,
    loginFailure,
    signupSuccess,
    signupFailure,
} from '../reducers/AuthSlice';
import { ActionType } from '../../types/common';

// Login saga
export function* loginUser({ payload, type }: ActionType<UserAuth_Props>): Generator<CallEffect | PutEffect, void, AuthResponse> {
    try {
        const { data, navigate, resetForm } = payload;
        const response = yield call(LOGIN, data);
        const result: AuthSuccessResponse = response.data;

        if (result.success) {
            const user = EncryptData(result.data);
            const token = EncryptData(result.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            navigate("/");
            resetForm && resetForm();

            yield put(loginSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        showToast({
            message: errorMessage,
            type: 'error',
            durationTime: 3000,
            position: 'top-right',
        });
        yield put(loginFailure(errorMessage));
    }
};

// Signup saga
export function* signupUser({ payload, type }: ActionType<UserAuth_Props>): Generator<CallEffect | PutEffect, void, AuthResponse> {
    try {
        const { data, navigate, resetForm } = payload;
        const response = yield call(SIGNUP, data);
        const result: AuthSuccessResponse = response.data;

        if (result.success) {
            const user = EncryptData(result.data);
            const token = EncryptData(result.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            navigate("/");
            resetForm && resetForm();

            yield put(signupSuccess(result));
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.payload?.message || error.message;
        showToast({
            message: errorMessage,
            type: 'error',
            durationTime: 3000,
            position: 'top-right',
        });
        yield put(signupFailure(errorMessage));
    }
};

export default function* watchAuthSaga() {
    yield takeLatest('authSlice/loginRequest', loginUser);
    yield takeLatest('authSlice/signupRequest', signupUser);
}