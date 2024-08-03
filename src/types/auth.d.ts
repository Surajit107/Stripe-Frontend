// Signin input type
export interface authInInputValues {
    name?: string;
    email?: string;
    credential?: string;
    password?: string;
};

// User auth props type
export interface UserAuth_Props {
    data: authInInputValues;
    navigate?: any;
    resetForm?: Function;
};

// UserSubscription type
export interface UserSubscription {
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
export interface UserData {
    _id: string;
    name: string;
    email: string;
    subscription: UserSubscription;
    is_subscribed: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
export interface UserDataResponse extends UserData { };

// Define the type for a single permission
export interface Permission {
    name: string;
};

// Define the type for the role, which includes an array of permissions
export interface Role {
    name: string;
    permissions: Permission[];
};

// PermissionCheckResult type
export interface PermissionCheckResult {
    [key: string]: boolean;
};

// Define the type for the login success response
export interface AuthSuccessResponse {
    data: UserData;
    message: string;
    success: boolean;
    token: string;
};

// Common response type for authentication
export type AuthResponse = ApiResponse<AuthSuccessResponse['data']>;