import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { styled, darken } from '@mui/system';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { stripeTheme } from '../../../theme/stripeTheme';

const PlanButton = styled(Button)(() => {
    const backgroundColor = stripeTheme.blurple;
    const hoverColor = darken(backgroundColor, 0.1);
    return {
        padding: '12px 24px',
        textTransform: 'none',
        fontWeight: 600,
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

const CustomPlanCard = (): JSX.Element => {
    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: `1px solid ${stripeTheme.border}`,
                backgroundColor: stripeTheme.surface,
                boxShadow: stripeTheme.shadowCard,
                transition: 'box-shadow 0.25s ease, transform 0.2s ease',
                overflow: 'visible',
                '&:hover': {
                    boxShadow: stripeTheme.shadowCardHover,
                },
            }}
        >
            <Box
                sx={{
                    pt: 3,
                    px: 2.5,
                    pb: 2,
                    borderBottom: `1px solid ${stripeTheme.border}`,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        color: stripeTheme.slate,
                        letterSpacing: '-0.02em',
                        textAlign: 'center',
                    }}
                >
                    Custom
                </Typography>
            </Box>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 2.5, px: 2.5, pb: 2.5 }}>
                <Stack spacing={2} sx={{ flex: 1, minHeight: 220, justifyContent: 'flex-start' }}>
                    <Typography variant="body2" sx={{ color: stripeTheme.slate, lineHeight: 1.65 }}>
                        Need higher limits, a business agreement, or API access? We&apos;ll tailor a
                        plan to your workload.
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: 'rgba(99, 91, 255, 0.06)',
                            border: `1px solid ${stripeTheme.border}`,
                        }}
                    >
                        <MailOutlineRoundedIcon sx={{ color: stripeTheme.blurple, fontSize: 22 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                            <Box
                                component="a"
                                href="mailto:support+stripe-testing@example.com"
                                sx={{ color: stripeTheme.blurple, textDecoration: 'none', fontWeight: 600 }}
                            >
                                support+stripe-testing@example.com
                            </Box>
                        </Typography>
                    </Stack>
                </Stack>

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
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: '1.75rem', sm: '2rem' },
                                fontWeight: 800,
                                lineHeight: 1.2,
                                color: stripeTheme.slate,
                                letterSpacing: '-0.03em',
                            }}
                        >
                            Let&apos;s talk
                        </Typography>
                        <Typography variant="body2" sx={{ color: stripeTheme.slateSoft, fontWeight: 500 }}>
                            Custom pricing
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PlanButton
                        fullWidth
                        variant="contained"
                        href="mailto:support+stripe-testing@example.com"
                    >
                        Contact sales
                    </PlanButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CustomPlanCard;
