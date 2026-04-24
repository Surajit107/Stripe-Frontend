import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import { styled, darken } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { loadStripe } from '@stripe/stripe-js';
import { REACT_APP_BASE_URL, REACT_APP_PUBLISHABLE_KEY, ngrokBrowserHeaders } from '../../../config/App.config';
import { CustomHeadersType, SubscriptionPlanData } from '../../../config/DataTypes';
import { DecryptData, EncryptData } from '../../../helper/EncryptDecrypt';
import { useEffect, useState, type ReactNode } from 'react';
import { showToast } from '../../../helper/Toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../services/store/Store';
import { getSubsPlans } from '../../../services/slices/SubscriptionSlice';
import { stripeTheme } from '../../../theme/stripeTheme';

interface PlanProps {
    plan: SubscriptionPlanData;
    header: CustomHeadersType;
}

const PlanButton = styled(Button)(() => {
    const backgroundColor = stripeTheme.blurple;
    const hoverColor = darken(backgroundColor, 0.1);
    return {
        padding: '12px 24px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9375rem',
        borderRadius: 999,
        backgroundColor,
        color: '#fff',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: hoverColor,
            boxShadow: 'none',
        },
    };
});

const FeatureRow = ({ children }: { children: ReactNode }) => (
    <Stack direction="row" alignItems="flex-start" spacing={1.25} sx={{ py: 0.5 }}>
        <CheckRoundedIcon
            sx={{
                fontSize: 20,
                color: stripeTheme.blurple,
                flexShrink: 0,
                mt: 0.15,
            }}
        />
        <Typography
            component="span"
            variant="body2"
            sx={{ color: stripeTheme.slate, lineHeight: 1.55, fontWeight: 400 }}
        >
            {children}
        </Typography>
    </Stack>
);

const featureValueSx = { fontWeight: 600, color: 'text.primary' } as const;

const PlanCard = ({ plan, header }: PlanProps): JSX.Element => {
    const token: string | null = window.localStorage.getItem('token');
    const _TOKEN = DecryptData(token ?? 'null');

    const user: string | null = window.localStorage.getItem('user');
    const _USER_DATA = DecryptData(user ?? 'null');
    const [isActive, setIsActive] = useState<boolean>(_USER_DATA?.subscription?.planId === plan?.stripe_price_id);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(_USER_DATA?.is_subscribed);

    const dispatch = useDispatch<AppDispatch>();

    const handlePayment = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) {
                throw new Error('Stripe could not be loaded.');
            }

            const body = { product: plan };
            const headers = {
                ...ngrokBrowserHeaders,
                'Content-Type': 'application/json',
                authorization: `Bearer ${_TOKEN}`,
            };

            const response = await axios.post(
                `${REACT_APP_BASE_URL}/user/api/v1/create-checkout-session`,
                body,
                { headers }
            );

            const session = response.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result?.error) {
                console.error('Redirect to checkout error:', result.error);
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            console.error('Error in payment integration:', error);
            showToast({
                message: err?.response?.data?.message ?? 'Payment could not be started.',
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        }
    };

    const handleUpgrade = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) throw new Error('Stripe could not be loaded.');

            const body = { product: plan };
            const headers = {
                ...ngrokBrowserHeaders,
                'Content-Type': 'application/json',
                authorization: `Bearer ${_TOKEN}`,
            };

            const response = await axios.post(
                `${REACT_APP_BASE_URL}/user/api/v1/update-subscription`,
                body,
                { headers }
            );
            const result = response.data;

            if (result.success) {
                showToast({
                    message: 'Subscription updated successfully!',
                    type: 'success',
                    durationTime: 4000,
                    position: 'top-center',
                });
                const userEnc = EncryptData(result?.data);
                const tokenEnc = EncryptData(result?.token);
                window.localStorage.setItem('token', tokenEnc);
                window.localStorage.setItem('user', userEnc);
                dispatch(getSubsPlans(header));
            } else {
                showToast({
                    message: result.message || 'Unexpected response from server.',
                    type: 'error',
                    durationTime: 4000,
                    position: 'top-center',
                });
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            console.error('Error in upgrade integration:', error);
            showToast({
                message: err?.response?.data?.message ?? err?.message ?? 'Update could not be completed.',
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        }
    };

    useEffect(() => {
        setIsActive(_USER_DATA?.subscription?.planId === plan?.stripe_price_id);
        setIsSubscribed(_USER_DATA?.is_subscribed);
    }, [_USER_DATA?.subscription?.planId, plan?.stripe_price_id, _USER_DATA?.is_subscribed]);

    const isCustom = plan?.name === 'Custom';
    const displayAmount = isCustom ? null : plan?.amount;

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: `1px solid ${isActive ? stripeTheme.blurple : stripeTheme.border}`,
                backgroundColor: stripeTheme.surface,
                boxShadow: isActive ? stripeTheme.shadowActive : stripeTheme.shadowCard,
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: isActive ? stripeTheme.shadowActive : stripeTheme.shadowCardHover,
                },
            }}
        >
            <Box
                sx={{
                    pt: 2.5,
                    px: 2.5,
                    pb: 2,
                    borderBottom: `1px solid ${stripeTheme.border}`,
                    background: isActive
                        ? `linear-gradient(135deg, ${stripeTheme.blurple}08 0%, transparent 100%)`
                        : 'transparent',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={isActive ? 'space-between' : 'center'}
                    spacing={1.5}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: stripeTheme.slate,
                            letterSpacing: '-0.02em',
                            textAlign: isActive ? 'left' : 'center',
                            flex: isActive ? 1 : 'none',
                            minWidth: 0,
                        }}
                    >
                        {plan?.name}
                    </Typography>
                    {isActive && (
                        <Chip
                            label="Current plan"
                            size="small"
                            sx={{
                                flexShrink: 0,
                                fontWeight: 500,
                                fontSize: '0.7rem',
                                height: 26,
                                maxWidth: '100%',
                                bgcolor: stripeTheme.successSoft,
                                color: '#0a4d1a',
                                border: `1px solid ${stripeTheme.success}55`,
                            }}
                        />
                    )}
                </Stack>
            </Box>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 2.5, px: 2.5, pb: 2.5 }}>
                <Box sx={{ flex: 1, minHeight: 220 }}>
                    <Stack spacing={0}>
                        <FeatureRow>
                            <Box component="span" sx={featureValueSx}>
                                {plan?.user_count}
                            </Box>{' '}
                            {plan?.user_count === 1 ? 'user' : 'users'}
                        </FeatureRow>
                        <FeatureRow>
                            <Box component="span" sx={featureValueSx}>
                                {plan?.chat_inference}
                            </Box>{' '}
                            chat inferences
                        </FeatureRow>
                        <FeatureRow>
                            <Box component="span" sx={featureValueSx}>
                                {plan?.image_generation}
                            </Box>{' '}
                            image generations
                        </FeatureRow>
                        <FeatureRow>
                            <Box component="span" sx={featureValueSx}>
                                {plan?.youtube_video_summarization}
                            </Box>{' '}
                            YouTube video summaries
                        </FeatureRow>
                        {!!plan?.financial_data_insight_for_stocks && (
                            <FeatureRow>Financial data insight for stocks</FeatureRow>
                        )}
                        {plan?.news_aggregator_per_day > 0 && (
                            <FeatureRow>
                                {plan?.news_aggregator_per_day} news aggregations / day
                            </FeatureRow>
                        )}
                    </Stack>
                </Box>

                <Box
                    sx={{
                        textAlign: 'center',
                        py: 2.5,
                        my: 1,
                        borderTop: `1px solid ${stripeTheme.border}`,
                        borderBottom: `1px solid ${stripeTheme.border}`,
                    }}
                >
                    <Stack alignItems="center" spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            {!isCustom && (
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 500,
                                        color: stripeTheme.slateSoft,
                                        mt: 0.5,
                                        mr: 0.25,
                                    }}
                                >
                                    $
                                </Typography>
                            )}
                            <Typography
                                variant="h3"
                                component="span"
                                sx={{
                                    fontSize: { xs: '2.5rem', sm: '2.75rem' },
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: stripeTheme.slate,
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                {isCustom ? 'Custom' : displayAmount}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ color: stripeTheme.slateSoft, fontWeight: 400 }}
                        >
                            {isCustom ? 'Contact us for pricing' : 'per month'}
                        </Typography>
                    </Stack>
                </Box>

                {isActive ? (
                    <Box
                        sx={{
                            py: 1.5,
                            px: 2,
                            borderRadius: 999,
                            textAlign: 'center',
                            bgcolor: stripeTheme.successSoft,
                            color: '#0a4d1a',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        You&apos;re subscribed
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PlanButton
                            fullWidth
                            variant="contained"
                            onClick={isSubscribed ? handleUpgrade : handlePayment}
                        >
                            {isSubscribed ? 'Switch to this plan' : 'Subscribe'}
                        </PlanButton>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default PlanCard;
