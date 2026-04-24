import { JwtPayload } from "jwt-decode";
import { ReactNode } from "react";

// Header type
export type CustomHeadersType = {
    headers: {
        Authorization: string
    }
};

// Form value props type
export type FormValues_Props = {
    data?: FormData | undefined;
    header?: CustomHeadersType | undefined;
    resetForm?: Function;
};

// Signin input type
export type authInInputValues = {
    name?: string;
    email?: string;
    credential?: string;
    password?: string;
};

// Form input Event type
export type SyntheticBaseEvent = {
    target: {
        value: string;
        name: string;
    };
};

// User auth props type
export type UserAuth_Props = {
    data: authInInputValues;
    navigate?: any;
    resetForm?: Function;
};

// UserSubscription type
export type UserSubscription = {
    subscriptionId: string;
    customerId: string;
    sessionId: string;
    planId: string;
    planType: string;
    planStartDate: string;
    planEndDate: string;
    planDuration: string;
};

// UserData type
export type UserData = {
    _id: string;
    name: string;
    email: string;
    subscription: UserSubscription;
    is_subscribed: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

// Define the type for a single permission
export type Permission = {
    name: string;
};

// Define the type for the role, which includes an array of permissions
export type Role = {
    name: string;
    permissions: Permission[];
};

// PermissionCheckResult type
export type PermissionCheckResult = {
    [key: string]: boolean;
};

// Define the type for the login success response
export type AuthSuccessResponse = {
    data: UserData;
    message: string;
    success: boolean;
    token: string;
};

// CustomAlertProps
export type CustomAlertProps = {
    type: 'success' | 'danger' | 'warning' | 'info' | 'dark';
    message: string;
    onClose: () => void;
}

// User drop down links type
export type dropdownItemsType = {
    icon: string;
    text: string;
    link: string;
};

// CustomJwtPayload type
export interface CustomJwtPayload extends JwtPayload {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    subscription: {
        sessionId: string;
        planId: string;
        planType: string;
        planStartDate: string | null;
        planEndDate: string | null;
        planDuration: string;
    } | null;
    is_subscribed?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export interface Subscription {
    _id: string;
    name: string;
    stripe_price_id: string;
    trial_days: number;
    is_trial: boolean;
    amount: number;
    type: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SubscriptionPlanData {
    _id: string;
    name: string;
    stripe_price_id: string;
    trial_days: number;
    is_trial: boolean;
    amount: number;
    type: number;
    user_count: number;
    chat_inference: string;
    image_generation: number;
    youtube_video_summarization: string;
    financial_data_insight_for_stocks: boolean;
    news_aggregator_per_day: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// PaymentSuccessParams
export type PaymentSuccessParams = {
    header: CustomHeadersType;
    _sessionID: string | undefined;
}

// Common response type for authentication
export type AuthResponse = ApiResponse<AuthSuccessResponse['data']>;