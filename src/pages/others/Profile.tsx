import { useState, useEffect, useMemo } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Link,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { DecryptData } from '../../helper/EncryptDecrypt';
import axios from 'axios';
import { REACT_APP_BASE_URL, ngrokBrowserHeaders } from '../../config/App.config';
import { showToast } from '../../helper/Toast';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../services/store/Store';
import { cancelSub, getSubDetails, requestRefund } from '../../services/slices/SubscriptionSlice';
import ConfModal from '../../util/ConfModal';
import { stripeTheme } from '../../theme/stripeTheme';
import { CustomHeadersType } from '../../config/DataTypes';

type ProfilePageProps = {
    _TOKEN: string;
};

const sectionLabelSx = {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: stripeTheme.slateSoft,
    mb: 2,
    display: 'block',
};

/** Keeps the profile title block in the light body area (not over the color strip). */
const HEADER_BAR_PX = 88;

const fieldLabelSx = {
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: 'text.secondary',
    mb: 0.5,
};

const dateCaptionSx = {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    lineHeight: 1.2,
    mb: 0.25,
};

const Profile = ({ _TOKEN }: ProfilePageProps): JSX.Element => {
    const user: string | null = window.localStorage.getItem('user');
    const _USER_DATA = DecryptData(user ?? 'null') as {
        name?: string;
        email?: string;
        is_subscribed?: boolean;
        subscription?: { customerId?: string; planId?: string };
    } | null;

    const header: CustomHeadersType = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${_TOKEN}`,
            },
        }),
        [_TOKEN]
    );

    const { subs_details_data } = useSelector(
        (state: { subscriptionSlice: { subs_details_data: unknown } }) => state.subscriptionSlice
    );
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'cancel' | 'refund' | null>(null);

    const rawDetails = Array.isArray(subs_details_data) ? undefined : subs_details_data;
    const subscriptionDetails = rawDetails as
        | {
              product?: { name?: string };
              subscription?: {
                  start_date?: number;
                  current_period_end?: number;
                  plan?: { amount?: number };
              };
          }
        | undefined;

    const initials = useMemo(() => {
        const raw = _USER_DATA?.name?.trim() || _USER_DATA?.email?.trim() || '?';
        const parts = raw.split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
        }
        return raw.slice(0, 2).toUpperCase();
    }, [_USER_DATA?.name, _USER_DATA?.email]);

    const planAmountCents = subscriptionDetails?.subscription?.plan?.amount;
    const monthlyUsd =
        typeof planAmountCents === 'number' && !Number.isNaN(planAmountCents) ? planAmountCents / 100 : null;

    const handleViewPlan = async () => {
        const headers = {
            ...ngrokBrowserHeaders,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${_TOKEN}`,
        };
        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/billing-portal`, {}, { headers });
            const url = response?.data?.data?.url;
            if (url) {
                window.location.href = url;
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            showToast({
                message: err?.response?.data?.message ?? 'Could not open the billing portal.',
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        }
    };

    const handleOpenCancelModal = () => {
        setModalType('cancel');
        setModalOpen(true);
    };

    const handleOpenRefundModal = () => {
        setModalType('refund');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalType(null);
    };

    const handleRequestRefund = () => {
        dispatch(requestRefund(header));
    };

    const handleConfirmCancel = () => {
        dispatch(cancelSub(header));
        handleCloseModal();
    };

    const handleConfirmRefund = () => {
        handleRequestRefund();
        handleCloseModal();
    };

    useEffect(() => {
        if (_USER_DATA?.subscription?.customerId) {
            dispatch(getSubDetails(header));
        }
    }, [dispatch, header, _USER_DATA?.subscription?.customerId]);

    return (
        <>
            <Box
                sx={{
                    minHeight: '72vh',
                    background: `linear-gradient(180deg, ${stripeTheme.background} 0%, #e8edf3 100%)`,
                    py: { xs: 3, md: 5 },
                }}
            >
                <Container maxWidth="md">
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: `1px solid ${stripeTheme.border}`,
                            boxShadow: stripeTheme.shadowCard,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                height: HEADER_BAR_PX,
                                background: `linear-gradient(90deg, ${stripeTheme.blurple} 0%, #4f47d1 100%)`,
                            }}
                        />
                        <Box
                            sx={{
                                px: { xs: 2.5, sm: 4 },
                                pb: 4,
                                pt: { xs: 2, sm: 4 },
                                bgcolor: stripeTheme.surface,
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                alignItems={{ xs: 'center', sm: 'center' }}
                                sx={{ mt: { xs: -5, sm: -6 } }}
                            >
                                <Avatar
                                    alt={_USER_DATA?.name || 'User'}
                                    sx={{
                                        width: 96,
                                        height: 96,
                                        fontSize: '1.75rem',
                                        fontWeight: 700,
                                        border: '4px solid #fff',
                                        bgcolor: stripeTheme.slate,
                                        color: '#fff',
                                        flexShrink: 0,
                                    }}
                                >
                                    {initials}
                                </Avatar>
                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: 0,
                                        textAlign: { xs: 'center', sm: 'left' },
                                    }}
                                >
                                    <Typography variant="h5" component="h1" sx={{ fontWeight: 800, color: stripeTheme.slate }}>
                                        {_USER_DATA?.name || 'Account'}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: stripeTheme.slateSoft, mt: 0.5, wordBreak: 'break-word' }}>
                                        {_USER_DATA?.email}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Grid container spacing={3} sx={{ mt: 3 }}>
                                <Grid item xs={12}>
                                    <Typography sx={sectionLabelSx}>Subscription</Typography>
                                    {_USER_DATA?.is_subscribed && subscriptionDetails?.product ? (
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 3,
                                                borderRadius: 2,
                                                borderColor: stripeTheme.border,
                                                bgcolor: 'rgba(99, 91, 255, 0.04)',
                                            }}
                                        >
                                            <Stack spacing={2.5}>
                                                <Stack
                                                    direction={{ xs: 'column', sm: 'row' }}
                                                    justifyContent="space-between"
                                                    alignItems={{ sm: 'flex-start' }}
                                                    spacing={2}
                                                    sx={{ pt: 0.5 }}
                                                >
                                                    <Box>
                                                        <Typography component="p" sx={fieldLabelSx}>
                                                            Plan
                                                        </Typography>
                                                        <Typography variant="h6" sx={{ fontWeight: 700, color: stripeTheme.slate, mt: 0 }}>
                                                            {subscriptionDetails?.product?.name}
                                                        </Typography>
                                                    </Box>
                                                    {monthlyUsd != null && (
                                                        <Box sx={{ textAlign: { sm: 'right' } }}>
                                                            <Typography component="p" sx={fieldLabelSx}>
                                                                Price
                                                            </Typography>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0 }}>
                                                                ${monthlyUsd.toFixed(2)}{' '}
                                                                <Box component="span" sx={{ fontWeight: 500, fontSize: '0.9rem', color: stripeTheme.slateSoft }}>
                                                                    / month
                                                                </Box>
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Stack>
                                                <Divider flexItem sx={{ borderColor: stripeTheme.border, my: 0.5 }} />
                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                                                    {subscriptionDetails?.subscription?.start_date != null && (
                                                        <Stack direction="row" alignItems="flex-start" spacing={1.25} color={stripeTheme.slateSoft}>
                                                            <CalendarTodayOutlinedIcon sx={{ fontSize: 22, mt: 0.25, flexShrink: 0 }} />
                                                            <Box>
                                                                <Typography component="p" sx={{ ...dateCaptionSx, color: stripeTheme.slateSoft }}>
                                                                    Started
                                                                </Typography>
                                                                <Typography variant="body2" fontWeight={600} color={stripeTheme.slate}>
                                                                    {new Date(
                                                                        subscriptionDetails.subscription.start_date * 1000
                                                                    ).toLocaleDateString()}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    )}
                                                    {subscriptionDetails?.subscription?.current_period_end != null && (
                                                        <Stack direction="row" alignItems="flex-start" spacing={1.25} color={stripeTheme.slateSoft}>
                                                            <CalendarTodayOutlinedIcon sx={{ fontSize: 22, mt: 0.25, flexShrink: 0 }} />
                                                            <Box>
                                                                <Typography component="p" sx={{ ...dateCaptionSx, color: stripeTheme.slateSoft }}>
                                                                    Current period ends
                                                                </Typography>
                                                                <Typography variant="body2" fontWeight={600} color={stripeTheme.slate}>
                                                                    {new Date(
                                                                        subscriptionDetails.subscription.current_period_end * 1000
                                                                    ).toLocaleDateString()}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    ) : (
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 3,
                                                borderRadius: 2,
                                                borderColor: stripeTheme.border,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Typography sx={{ color: stripeTheme.slateSoft }}>
                                                You don&apos;t have an active subscription yet. View{' '}
                                                <Link component={RouterLink} to="/pricing" fontWeight={600} sx={{ color: stripeTheme.blurple }}>
                                                    pricing
                                                </Link>{' '}
                                                to get started.
                                            </Typography>
                                        </Paper>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={sectionLabelSx}>Billing actions</Typography>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap={1.5}>
                                        {_USER_DATA?.is_subscribed && (
                                            <Button
                                                variant="contained"
                                                onClick={handleViewPlan}
                                                endIcon={<OpenInNewRoundedIcon />}
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: 999,
                                                    px: 2.5,
                                                    bgcolor: stripeTheme.blurple,
                                                    boxShadow: 'none',
                                                    '&:hover': { bgcolor: stripeTheme.blurpleHover, boxShadow: 'none' },
                                                }}
                                            >
                                                Open billing portal
                                            </Button>
                                        )}
                                        {_USER_DATA?.is_subscribed && (
                                            <Button
                                                variant="outlined"
                                                color="inherit"
                                                onClick={handleOpenCancelModal}
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: 999,
                                                    px: 2.5,
                                                    borderColor: stripeTheme.borderStrong,
                                                    color: stripeTheme.slate,
                                                }}
                                            >
                                                Cancel subscription
                                            </Button>
                                        )}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleOpenRefundModal}
                                            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 999, px: 2.5 }}
                                        >
                                            Request refund
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </Box>

            <ConfModal
                modalId="confirm-action-modal"
                modalHeading={modalType === 'cancel' ? 'Cancel subscription' : 'Request refund'}
                modalContent={
                    modalType === 'cancel'
                        ? 'Your subscription will end at the end of the current billing period. You can reactivate or choose a new plan later.'
                        : 'Refund requests are reviewed according to your policy. This may be irreversible—confirm only if you intend to proceed.'
                }
                onDelete={modalType === 'cancel' ? handleConfirmCancel : handleConfirmRefund}
                open={isModalOpen}
                onClose={handleCloseModal}
                confirmLabel={modalType === 'cancel' ? 'Cancel subscription' : 'Request refund'}
                confirmColor="error"
            />
        </>
    );
};

export default Profile;
