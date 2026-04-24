import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { stripeTheme } from '../theme/stripeTheme';

const highlights = [
    {
        icon: <PaymentsOutlinedIcon sx={{ fontSize: 28 }} />,
        title: 'Stripe Checkout',
        description: 'Hosted payment pages with cards, wallets, and secure session handoff.',
    },
    {
        icon: <SpeedOutlinedIcon sx={{ fontSize: 28 }} />,
        title: 'Subscriptions',
        description: 'Upgrade paths, billing portal, and plan changes without custom payment code.',
    },
    {
        icon: <ShieldOutlinedIcon sx={{ fontSize: 28 }} />,
        title: 'Built for production',
        description: 'Token-backed API calls and clear success and cancel flows for your team to test end to end.',
    },
];

const Home = (): JSX.Element => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: 'calc(100vh - 64px - 80px)',
                background: `linear-gradient(180deg, ${stripeTheme.background} 0%, #eef2f7 55%, ${stripeTheme.background} 100%)`,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: `1px solid ${stripeTheme.border}`,
                    background: `radial-gradient(1200px 500px at 10% -10%, ${stripeTheme.blurple}18, transparent 60%),
            radial-gradient(800px 400px at 90% 0%, ${stripeTheme.blurple}12, transparent 50%)`,
                }}
            >
                <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={3} alignItems="flex-start" sx={{ maxWidth: 720 }}>
                        <Typography
                            component="h1"
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.035em',
                                color: stripeTheme.slate,
                                fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                                lineHeight: 1.12,
                            }}
                        >
                            Subscription billing,{' '}
                            <Box component="span" sx={{ color: stripeTheme.blurple }}>
                                without the guesswork
                            </Box>
                        </Typography>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                color: stripeTheme.slateSoft,
                                fontWeight: 400,
                                lineHeight: 1.6,
                                fontSize: { xs: '1.05rem', md: '1.15rem' },
                            }}
                        >
                            Explore a clean Stripe-style flow: sign in, pick a plan, and manage billing from your
                            profile. This app is a focused demo for testing Checkout, upgrades, and the customer portal.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
                            <Button
                                component={RouterLink}
                                to="/pricing"
                                variant="contained"
                                size="large"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    py: 1.25,
                                    borderRadius: 999,
                                    bgcolor: stripeTheme.blurple,
                                    boxShadow: '0 8px 24px rgba(99, 91, 255, 0.35)',
                                    '&:hover': { bgcolor: stripeTheme.blurpleHover },
                                }}
                            >
                                View plans
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/profile"
                                variant="outlined"
                                size="large"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    py: 1.25,
                                    borderRadius: 999,
                                    borderColor: stripeTheme.borderStrong,
                                    color: stripeTheme.slate,
                                    '&:hover': {
                                        borderColor: stripeTheme.blurple,
                                        bgcolor: 'rgba(99, 91, 255, 0.06)',
                                    },
                                }}
                            >
                                Account & billing
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
                <Grid container spacing={3}>
                    {highlights.map((item) => (
                        <Grid item xs={12} md={4} key={item.title}>
                            <Box
                                sx={{
                                    height: '100%',
                                    p: 3,
                                    borderRadius: 3,
                                    border: `1px solid ${stripeTheme.border}`,
                                    bgcolor: stripeTheme.surface,
                                    boxShadow: stripeTheme.shadowCard,
                                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                                    '&:hover': {
                                        boxShadow: stripeTheme.shadowCardHover,
                                    },
                                }}
                            >
                                <Stack spacing={1.5}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: stripeTheme.blurple,
                                            bgcolor: 'rgba(99, 91, 255, 0.1)',
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: stripeTheme.slate }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: stripeTheme.slateSoft, lineHeight: 1.65 }}>
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
