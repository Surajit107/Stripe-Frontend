import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { paymentSuccess } from '../../services/slices/SubscriptionSlice';
import type { AppDispatch } from '../../services/store/Store';
import { DecryptData } from '../../helper/EncryptDecrypt';
import { stripeTheme } from '../../theme/stripeTheme';

const Cancel = (): JSX.Element => {
    const navigate = useNavigate();
    const { _sessionID } = useParams();
    const token: string | null = window.localStorage.getItem('token');
    const _TOKEN = DecryptData(token ?? 'null');
    const header = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${_TOKEN}`,
            },
        }),
        [_TOKEN]
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleProceed = useCallback(() => {
        dispatch(paymentSuccess({ _sessionID, header }));
    }, [_sessionID, header, dispatch]);

    useEffect(() => {
        handleProceed();
    }, [handleProceed]);

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 4,
                background: `linear-gradient(165deg, ${stripeTheme.background} 0%, #ede8f5 50%, ${stripeTheme.background} 100%)`,
            }}
        >
            <Container maxWidth="sm">
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
                            pt: 5,
                            pb: 3,
                            px: 3,
                            textAlign: 'center',
                            background: `linear-gradient(180deg, rgba(211, 47, 47, 0.08) 0%, transparent 75%)`,
                        }}
                    >
                        <Box
                            sx={{
                                width: 88,
                                height: 88,
                                mx: 'auto',
                                mb: 2,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(211, 47, 47, 0.1)',
                                border: '2px solid rgba(211, 47, 47, 0.28)',
                            }}
                        >
                            <ErrorOutlineRoundedIcon sx={{ fontSize: 52, color: 'error.main' }} />
                        </Box>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                color: stripeTheme.slate,
                                mb: 1,
                            }}
                        >
                            Checkout wasn&apos;t completed
                        </Typography>
                        <Typography variant="body1" sx={{ color: stripeTheme.slateSoft, lineHeight: 1.65, maxWidth: 400, mx: 'auto' }}>
                            You closed the payment window or the session was cancelled. No charge was made. You can
                            return to pricing and try again when you&apos;re ready.
                        </Typography>
                    </Box>
                    <Stack spacing={1.5} sx={{ px: 3, pb: 3, alignItems: 'stretch' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={() => navigate('/')}
                            disableElevation
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 999,
                                py: 1.25,
                            }}
                        >
                            Go to home
                        </Button>
                        <Button
                            fullWidth
                            component={RouterLink}
                            to="/pricing"
                            variant="outlined"
                            size="large"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 999,
                                py: 1.15,
                                borderColor: stripeTheme.borderStrong,
                                color: stripeTheme.slate,
                                '&:hover': {
                                    borderColor: stripeTheme.blurple,
                                    bgcolor: 'rgba(99, 91, 255, 0.06)',
                                },
                            }}
                        >
                            Back to plans
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Cancel;
