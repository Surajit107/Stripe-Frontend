import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETUSERDETAILS, LOGIN, SIGNUP } from "../api/Api";
import { AuthResponse, CustomHeadersType, UserAuth_Props } from "../../config/DataTypes";
import { EncryptData } from "../../helper/EncryptDecrypt";
import { showToast } from "../../helper/Toast";

// loginUser thunk
export const loginUser = createAsyncThunk("/api/v1/auth/login", async ({ data, navigate }: UserAuth_Props, { rejectWithValue }): Promise<AuthResponse | any> => {
    try {
        const response = await LOGIN(data);
        const result: any = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            navigate("/");

            return result;
        }
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        showToast({
            message: err?.payload?.message,
            type: 'error',
            durationTime: 3000,
            position: 'top-right',
        });
        return err;
    }
});

// signup thunk
export const signupUser = createAsyncThunk("/api/v1/auth/signup", async ({ data, navigate }: UserAuth_Props, { rejectWithValue }): Promise<AuthResponse | any> => {
    try {
        const response = await SIGNUP(data);
        const result: any = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            navigate("/");

            return result;
        }
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        showToast({
            message: err?.payload?.message,
            type: 'error',
            durationTime: 3000,
            position: 'top-right',
        });
        return err;
    }
});

// getUserDetails thunk
export const getUserDetails = createAsyncThunk("/user/api/v1/payment-success", async (header: CustomHeadersType, { rejectWithValue }): Promise<any> => {
    try {
        const response = await GETUSERDETAILS(header);
        const result: any = response?.data;
        return result;
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});


const AuthSlice = createSlice({
    name: "authSlice",
    initialState: {
        user_data: [],
        auth_loading: false,
        error: null
    },
    reducers: {
        logoutUser(state) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            state.user_data = [];
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // loginUser states
        builder.addCase(loginUser.pending, (state) => {
            state.auth_loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.auth_loading = false;
            const user_data: any = payload;
            state.user_data = user_data;
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.auth_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // signupUser states
        builder.addCase(signupUser.pending, (state) => {
            state.auth_loading = true;
        })
        builder.addCase(signupUser.fulfilled, (state, { payload }) => {
            state.auth_loading = false;
            const user_data: any = payload;
            state.user_data = user_data;
        })
        builder.addCase(signupUser.rejected, (state, { payload }) => {
            state.auth_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // getUserDetails states
        builder.addCase(getUserDetails.pending, (state) => {
            state.auth_loading = true;
        })
        builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
            state.auth_loading = false;
            const user_data: any = payload?.data;
            state.user_data = user_data;
        })
        builder.addCase(getUserDetails.rejected, (state, { payload }) => {
            state.auth_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
})


export const { logoutUser, clearAuthError } = AuthSlice.actions;
export default AuthSlice.reducer;