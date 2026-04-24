import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import PlanCard from '../../components/core/pricing/PlanCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../services/store/Store';
import { useEffect, useState } from 'react';
import { getSubsPlans } from '../../services/slices/SubscriptionSlice';
import { CustomHeadersType, SubscriptionPlanData } from '../../config/DataTypes';
import CustomPlanCard from '../../components/core/pricing/CustomPlanCard';
import { stripeTheme } from '../../theme/stripeTheme';

type PricingProps = {
    header: CustomHeadersType;
};

const Pricing = ({ header }: PricingProps): JSX.Element => {
    const [plans, setPlans] = useState<Array<SubscriptionPlanData>>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { subsPlan_data } = useSelector((state: { subscriptionSlice: { subsPlan_data: SubscriptionPlanData[] } }) => state.subscriptionSlice);

    useEffect(() => {
        dispatch(getSubsPlans(header));
    }, [dispatch, header]);

    useEffect(() => {
        setPlans(subsPlan_data);
    }, [subsPlan_data]);

    return (
        <Box
            component="section"
            sx={{
                minHeight: '64vh',
                background: `linear-gradient(180deg, ${stripeTheme.background} 0%, #e8edf2 100%)`,
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
                <Stack spacing={1} sx={{ mb: 4, maxWidth: 640, mx: 'auto', textAlign: 'center', alignItems: 'center' }}>
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            color: stripeTheme.slate,
                            fontSize: { xs: '1.85rem', sm: '2.25rem' },
                        }}
                    >
                        Simple, transparent pricing
                    </Typography>
                    <Typography variant="body1" sx={{ color: stripeTheme.slateSoft, lineHeight: 1.65, fontSize: '1.05rem' }}>
                        Choose a plan that matches your usage. Upgrade or change plans anytime; your current selection is
                        highlighted below.
                    </Typography>
                </Stack>

                <Grid container spacing={3} justifyContent="center">
                    {plans?.map((plan, index) => (
                        <Grid item xs={12} sm={6} md={3} key={plan?.stripe_price_id || index}>
                            <PlanCard plan={plan} header={header} />
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={3}>
                        <CustomPlanCard />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Pricing;
