import { createSlice } from "@reduxjs/toolkit";


const SubscriptionSlice = createSlice({
    name: "subscriptionSlice",
    initialState: {
        sub_data: [],
        sub_resp: null,
        subs_details_data: [],
        subscription_loading: false,
        error: null,
        type: "",
    },
    reducers: {
        // getSubsPlans reducers
        getSubsPlansRequest(state, { payload, type }) {
            state.subscription_loading = true;
            state.type = type;
        },
        getSubsPlansSuccess(state, { payload, type }) {
            state.subscription_loading = false;
            state.sub_data = payload.data;
            state.type = type;
        },
        getSubsPlansFailure(state, { payload, type }) {
            state.subscription_loading = false;
            state.error = payload;
            state.type = type;
        },

        // successPayment reducers
        successPaymentRequest(state, { payload, type }) {
            state.subscription_loading = true;
            state.type = type;
        },
        successPaymentSuccess(state, { payload, type }) {
            state.subscription_loading = false;
            state.sub_resp = payload.data;
            state.type = type;
        },
        successPaymentFailure(state, { payload, type }) {
            state.subscription_loading = false;
            state.error = payload;
            state.type = type;
        },

        // subDetails reducers
        subDetailsRequest(state, { payload, type }) {
            state.subscription_loading = true;
            state.type = type;
        },
        subDetailsSuccess(state, { payload, type }) {
            state.subscription_loading = false;
            state.subs_details_data = payload.data;
            state.type = type;
        },
        subDetailsFailure(state, { payload, type }) {
            state.subscription_loading = false;
            state.error = payload;
            state.type = type;
        },

        // subPlanRefund reducers
        subPlanRefundRequest(state, { payload, type }) {
            state.subscription_loading = true;
            state.type = type;
        },
        subPlanRefundSuccess(state, { payload, type }) {
            state.subscription_loading = false;
            state.sub_data = payload.data;
            state.type = type;
        },
        subPlanRefundFailure(state, { payload, type }) {
            state.subscription_loading = false;
            state.error = payload;
            state.type = type;
        },

        // cancelSub reducers
        cancelSubRequest(state, { payload, type }) {
            state.subscription_loading = true;
            state.type = type;
        },
        cancelSubSuccess(state, { payload, type }) {
            state.subscription_loading = false;
            state.sub_resp = payload.data;
            state.type = type;
        },
        cancelSubFailure(state, { payload, type }) {
            state.subscription_loading = false;
            state.error = payload;
            state.type = type;
        },
    },
})


export const {
    getSubsPlansRequest,
    getSubsPlansSuccess,
    getSubsPlansFailure,

    successPaymentRequest,
    successPaymentSuccess,
    successPaymentFailure,

    subDetailsRequest,
    subDetailsSuccess,
    subDetailsFailure,

    cancelSubRequest,
    cancelSubSuccess,
    cancelSubFailure,

    subPlanRefundRequest,
    subPlanRefundSuccess,
    subPlanRefundFailure,
} = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;