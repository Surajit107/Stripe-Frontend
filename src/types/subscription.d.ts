import { JwtPayload } from "jwt-decode";

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
};

export interface SubscriptionPlanData extends Subscription {
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
export interface PaymentSuccessParams<HT = CustomHeadersType> {
    header: HT;
    _sessionID: string | undefined;
}