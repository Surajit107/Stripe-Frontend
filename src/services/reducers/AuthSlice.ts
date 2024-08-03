import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "authSlice",
    initialState: {
        user_data: [],
        auth_loading: false,
        type: "",
        error: null
    },
    reducers: {
        loginRequest: (state, { payload, type }) => {
            state.auth_loading = true;
            state.type = type;
        },
        loginSuccess: (state, { payload, type }) => {
            state.auth_loading = false;
            state.user_data = payload.data;
            state.type = type;
        },
        loginFailure: (state, { payload, type }) => {
            state.auth_loading = false;
            state.error = payload;
            state.type = type;
        },

        signupRequest: (state, { payload, type }) => {
            state.auth_loading = true;
            state.type = type;
        },
        signupSuccess: (state, { payload, type }) => {
            state.auth_loading = false;
            state.user_data = payload.data;
            state.type = type;
        },
        signupFailure: (state, { payload, type }) => {
            state.auth_loading = false;
            state.error = payload;
            state.type = type;
        },

        logoutUser(state) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            state.user_data = [];
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    logoutUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;
