import { Button, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { styled, darken } from '@mui/system';
import { loadStripe } from '@stripe/stripe-js';
import { REACT_APP_BASE_URL, REACT_APP_PUBLISHABLE_KEY } from '../../../config/App.config';
import { DecryptData } from '../../../helper/EncryptDecrypt';
import { useEffect, useState } from 'react';
import { showToast } from '../../../helper/Toast';
import axios from 'axios';
import { ArrowForward } from '@mui/icons-material';
import { SubscriptionPlanData } from '../../../types/subscription';
import { useTheme } from '../../../services/ThemeContext';

interface PlanProps {
    plan: SubscriptionPlanData;
}

const PlanButton = styled(Button)(({ theme }) => {
    const borderColor = theme.palette.mode === 'light' ? '#673de6' : '#9c27b0';

    return {
        padding: '10px 30px',
        textTransform: 'uppercase',
        fontWeight: 500,
        border: `1px solid ${borderColor}`,
        backgroundColor: 'transparent',
        color: borderColor,
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: darken(borderColor, 0.1),
            color: '#fff',
        },
        '&:focus': {
            outline: 'none',
        },
    };
});

const ActiveDiv = styled("div")(({ theme }) => ({
    padding: '10px 30px',
    textTransform: 'uppercase',
    fontWeight: 500,
    backgroundColor: theme.palette.mode === 'light' ? '#1bd764' : '#4caf50',
    borderRadius: 4,
    color: '#fff',
    width: "100%",
    height: "100%",
}));

const PlanCard = ({ plan }: PlanProps): JSX.Element => {
    const { theme } = useTheme(); // Access theme from context
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');

    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');
    const [isActive, setIsActive] = useState<boolean>(_USER_DATA?.subscription?.planId === plan?.stripe_price_id);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(_USER_DATA?.is_subscribed);

    const handlePayment = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) {
                throw new Error("Stripe could not be loaded.");
            }

            const body = {
                product: plan,
            };

            const headers = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${_TOKEN}`
            };

            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/create-checkout-session`, body, { headers });

            const session = response.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result?.error) {
                console.error("Redirect to checkout error:", result.error);
            }
        } catch (error: any) {
            console.error("Error in payment integration:", error);
            showToast({
                message: error?.response?.data?.message,
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        }
    };

    const handleUpgrade = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) {
                throw new Error("Stripe could not be loaded.");
            }

            const body = {
                product: plan,
            };

            const headers = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${_TOKEN}`
            };

            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/update-subscription`, body, { headers });

            const session = response.data;
            if (!session || !session.sessionId) {
                throw new Error("Session ID is missing in the response.");
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId
            });

            if (result?.error) {
                console.error("Redirect to checkout error:", result.error);
            }
        } catch (error: any) {
            console.error("Error in upgrade integration:", error);
            showToast({
                message: error?.response?.data?.message || error.message,
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

    const getPlanSVG = (planName: string) => {
        switch (planName) {
            case 'Basic':
                return (
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="#8c85ff">
                        <circle cx="50" cy="50" r="40" />
                    </svg>
                );
            case 'Pro':
                return (
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="#8c85ff">
                        <polygon points="50,10 90,50 50,90 10,50" />
                    </svg>
                );
            case 'Business':
                return (
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="#8c85ff">
                        <polygon points="50,15 90,85 10,85" />
                    </svg>
                );
            default:
                return (
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="#8c85ff">
                        <path d="M10 80 C 40 10, 65 10, 95 80 S 40 90, 10 80" />
                    </svg>
                );
        }
    };

    return (
        <Card sx={{
            height: '500px',
            minHeight: '100px',
            backgroundColor: isActive ? (theme === 'light' ? '#ccf6dc' : '#2d6a4f') : (theme === 'light' ? "#fff" : "#333"),
            boxShadow: isActive ? (theme === 'light' ? '0px 5px 20px rgba(0, 0, 0, 0.2)' : '0px 5px 20px rgba(255, 255, 255, 0.2)') : (theme === 'light' ? '0px 3px 15px rgba(0, 0, 0, 0.1)' : '0px 3px 15px rgba(255, 255, 255, 0.1)'),
        }}>
            <CardHeader
                sx={{ backgroundColor: isActive ? (theme === 'light' ? '#1bd764' : '#4caf50') : (theme === 'light' ? '#8c85ff' : '#3f51b5'), color: '#fff', textAlign: 'center' }}
                title={<Typography variant="h6" component="h2">{plan?.name?.toUpperCase()}</Typography>}
            />
            <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {getPlanSVG(plan?.name)}
                </Box>
                <Typography variant="h6" component="h4" sx={{ color: theme === 'light' ? '#000' : '#fff', fontSize: '14px', textAlign: "center", marginBottom: "15px" }}>
                    {
                        plan?.name === "Basic" ? "A great solution for beginners to create website"
                            : plan?.name === "Pro" ? "Everything you need to create your website"
                                : "Level-up with more power and enhanced features"
                    }
                </Typography>
                <div style={{ borderTop: `1px solid ${theme === 'light' ? '#eee' : '#444'}`, margin: '0 auto 30px auto', width: '80%', textAlign: 'center' }}>
                    <Typography variant="h3" component="div" sx={{ fontSize: '82px', lineHeight: 1, color: theme === 'light' ? '#413b3b' : '#e0e0e0' }}>
                        <span style={{ fontSize: '38px', margin: '6px 0 0 -7px', display: 'inline-block' }}>
                            {plan?.name !== 'Custom' ? "$" : "$ Custom Price"}
                        </span>
                        {plan?.name !== 'Custom' ? plan?.amount : null}
                    </Typography>
                    <Typography variant="h6" component="h4" sx={{ color: theme === 'light' ? '#aaa' : '#ccc', fontSize: '14px' }}>Per month</Typography>
                </div>
                {
                    isActive ?
                        <ActiveDiv sx={{ display: 'flex', justifyContent: 'center' }}>Subscribed</ActiveDiv>
                        : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <PlanButton variant="contained" onClick={isSubscribed ? handleUpgrade : handlePayment} endIcon={<ArrowForward />}>
                                {isSubscribed ? 'Update' : 'Subscribe'}
                            </PlanButton>
                        </Box>
                }
            </CardContent>
        </Card>
    );
};

export default PlanCard;