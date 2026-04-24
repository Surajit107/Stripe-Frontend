import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { paymentSuccess } from '../../services/slices/SubscriptionSlice';
import type { AppDispatch } from '../../services/store/Store';
import { DecryptData } from '../../helper/EncryptDecrypt';
import { useCallback, useEffect, useMemo } from 'react';
import { stripeTheme } from '../../theme/stripeTheme';

const Success = (): JSX.Element => {
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
    const navigate = useNavigate();

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
                background: `linear-gradient(165deg, ${stripeTheme.background} 0%, #e2ebf3 45%, ${stripeTheme.background} 100%)`,
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
                            background: `linear-gradient(180deg, rgba(0, 217, 36, 0.1) 0%, transparent 75%)`,
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
                                bgcolor: 'rgba(0, 217, 36, 0.15)',
                                border: `2px solid ${stripeTheme.success}55`,
                            }}
                        >
                            <CheckCircleRoundedIcon sx={{ fontSize: 52, color: stripeTheme.success }} />
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
                            Payment successful
                        </Typography>
                        <Typography variant="body1" sx={{ color: stripeTheme.slateSoft, lineHeight: 1.65, maxWidth: 400, mx: 'auto' }}>
                            Your subscription is being activated. It may take a few seconds to appear on your account.
                        </Typography>
                    </Box>
                    <Stack
                        spacing={1.5}
                        sx={{ px: 3, pb: 3, alignItems: 'stretch' }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 999,
                                py: 1.25,
                                bgcolor: stripeTheme.blurple,
                                boxShadow: '0 6px 20px rgba(99, 91, 255, 0.35)',
                                '&:hover': { bgcolor: stripeTheme.blurpleHover },
                            }}
                        >
                            Go to home
                        </Button>
                        <Button
                            fullWidth
                            component={RouterLink}
                            to="/profile"
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
                            View account &amp; billing
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Success;
