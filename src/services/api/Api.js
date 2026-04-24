import axios from "axios";
import { REACT_APP_BASE_URL, ngrokBrowserHeaders } from "../../config/App.config";
// import toast from "react-hot-toast";

export const API = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: { ...ngrokBrowserHeaders },
});

// API.interceptors.response.use(
//     (response) => new Promise((resolve, reject) => resolve(response)),
//     (error) => new Promise((resolve, reject) => {
//         if (error.response.status === 429 && error.response.statusText === 'Too Many Requests') {
//             toast.error(error.response.data, {
//                 duration: 4000,
//                 style: {
//                     background: "#000",
//                     color: "#fff"
//                 },
//                 iconTheme: {
//                     primary: "#f00",
//                     secondary: "#fff"
//                 }
//             });
//         } else {
//             new Promise((resolve, reject) => reject(error));
//         };
//     })
// );

// Login
export const LOGIN = (data) => API.post("/api/v1/auth/login", data);
// Signup
export const SIGNUP = (data) => API.post("/api/v1/auth/signup", data);
// Get subscription plans
export const GETSUBSPLANS = (header) => API.get("/user/api/v1/get-subscription-plans", header);
// Get user details
export const GETUSERDETAILS = (header) => API.get("/user/api/v1/get-user-details", header);
// Payment suceess
export const PAYMENTSUCCESS = (_sessionID, header) => API.post("/user/api/v1/payment-success", _sessionID, header);
// Cancel subscription
export const CANCELSUB = (header) => API.post("/user/api/v1/cancel-subscription", header);
// Get sub details
export const GETSUBDETAILS = (header) => API.get("/user/api/v1/get-subscription-details", header);
// Request refund
export const REQREFUND = (header) => API.post("/user/api/v1/request-refund", header);