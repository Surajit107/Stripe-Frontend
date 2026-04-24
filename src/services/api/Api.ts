import axios, { AxiosResponse } from "axios";
import { REACT_APP_BASE_URL, ngrokBrowserHeaders } from "../../config/App.config";
import { authInInputValues, UserDataResponse } from "../../types/auth";
import { CustomHeadersType, NetworkResppne } from "../../types/common";
import { PaymentSuccessParams, Subscription } from "../../types/subscription";

export const API = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: { ...ngrokBrowserHeaders },
});

// Login
export const LOGIN = (data: authInInputValues): Promise<AxiosResponse<NetworkResppne<UserDataResponse>>> => API.post("/api/v1/auth/login", data);
// Signup
export const SIGNUP = (data: authInInputValues): Promise<AxiosResponse<NetworkResppne<UserDataResponse>>> => API.post("/api/v1/auth/signup", data);
// Get user details
export const GETUSERDETAILS = (header: CustomHeadersType): Promise<AxiosResponse<NetworkResppne<UserDataResponse>>> => API.get("/user/api/v1/get-user-details", header);
// Get subscription plans
export const GETSUBSPLANS = (header: CustomHeadersType): Promise<AxiosResponse<NetworkResppne<Array<Subscription>>>> => API.get("/user/api/v1/get-subscription-plans", header);
// Payment suceess
export const PAYMENTSUCCESS = ({ _sessionID, header }: PaymentSuccessParams): Promise<AxiosResponse<NetworkResppne<UserDataResponse>>> => API.post("/user/api/v1/payment-success", { _sessionID }, header);
// Get sub details
export const GETSUBDETAILS = (header: CustomHeadersType): Promise<AxiosResponse<NetworkResppne<any>>> => API.get("/user/api/v1/get-subscription-details", header);
// Cancel subscription
export const CANCELSUB = (header: CustomHeadersType): Promise<AxiosResponse<NetworkResppne<UserDataResponse>>> => API.post("/user/api/v1/cancel-subscription", header);
// Request refund
export const REQREFUND = (header: CustomHeadersType): Promise<AxiosResponse<NetworkResppne<any>>> => API.post("/user/api/v1/request-refund", header);