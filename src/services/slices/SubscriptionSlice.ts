import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CANCELSUB, GETSUBDETAILS, GETSUBSPLANS, PAYMENTSUCCESS, REQREFUND } from "../api/Api";
import { CustomHeadersType, PaymentSuccessParams } from "../../config/DataTypes";
import { EncryptData } from "../../helper/EncryptDecrypt";
import { showToast } from "../../helper/Toast";

// getSubsPlans thunk
export const getSubsPlans = createAsyncThunk("/user/api/get-subscription-plans", async (header: CustomHeadersType, { rejectWithValue }): Promise<any> => {
    try {
        const response = await GETSUBSPLANS(header);
        const result: any = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// paymentSuccess thunk
export const paymentSuccess = createAsyncThunk("/user/api/v1/payment-success", async ({ _sessionID, header }: PaymentSuccessParams, { rejectWithValue }): Promise<any> => {
    try {
        const response = await PAYMENTSUCCESS({ _sessionID }, header);
        const result: any = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// cancelSub thunk
export const cancelSub = createAsyncThunk("/user/api/v1/cancel-subscription", async (header: CustomHeadersType, { rejectWithValue, dispatch }): Promise<any> => {
    try {
        const response = await CANCELSUB(header);
        const result: any = response?.data;
        if (result?.success) {
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

            dispatch(getSubDetails(header));
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getSubDetails thunk
export const getSubDetails = createAsyncThunk("/user/api/v1/get-subscription-details", async (header: CustomHeadersType, { rejectWithValue }): Promise<any> => {
    try {
        const response = await GETSUBDETAILS(header);
        const result: any = response?.data;
        if (result?.success) {
            return result;
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// requestRefund thunk
export const requestRefund = createAsyncThunk("/user/api/v1/request-refund", async (header: CustomHeadersType, { rejectWithValue }): Promise<any> => {
    try {
        const response = await REQREFUND(header);
        const result: any = response?.data;
        if (result?.success) {
            showToast({
                message: result?.message,
                type: 'success',
                durationTime: 3000,
                position: 'top-center',
            });
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        showToast({
            message: err?.payload?.message,
            type: 'error',
            durationTime: 4000,
            position: 'top-center',
        });
        return err;
    }
});


const SubscriptionSlice = createSlice({
    name: "subscriptionSlice",
    initialState: {
        subsPlan_data: [],
        subs_details_data: [],

        // Common States
        subscription_loading: false,
        error: null,
    },
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // getSubsPlans states
        builder.addCase(getSubsPlans.pending, (state) => {
            state.subscription_loading = true;
        })
        builder.addCase(getSubsPlans.fulfilled, (state, { payload }) => {
            state.subscription_loading = false;
            const subsPlan_data: any = payload?.data;
            state.subsPlan_data = subsPlan_data;
        })
        builder.addCase(getSubsPlans.rejected, (state, { payload }) => {
            state.subscription_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // getSubDetails states
        builder.addCase(getSubDetails.pending, (state) => {
            state.subscription_loading = true;
        })
        builder.addCase(getSubDetails.fulfilled, (state, { payload }) => {
            state.subscription_loading = false;
            const subs_details_data: any = payload?.data;
            state.subs_details_data = subs_details_data;
        })
        builder.addCase(getSubDetails.rejected, (state, { payload }) => {
            state.subscription_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
})


export const {
    clearError,
} = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;