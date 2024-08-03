import { Grid, Container, Box } from '@mui/material';
import PlanCard from '../../components/core/pricing/PlanCard';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSubsPlansRequest } from '../../services/reducers/SubscriptionSlice';
import { CustomHeadersType } from '../../types/common';
import { SubscriptionPlanData } from '../../types/subscription';

type pricing_props = {
    header: CustomHeadersType
}

const Pricing = ({ header }: pricing_props): JSX.Element => {
    const [plans, setPlans] = useState<Array<SubscriptionPlanData>>([])
    const dispatch: Dispatch<any> = useDispatch();
    const { sub_data } = useSelector((state: any) => state.subscriptionSlice);

    useEffect(() => {
        dispatch(getSubsPlansRequest(header));
    }, [dispatch, header]);

    useEffect(() => {
        setPlans(sub_data);
    }, [sub_data]);

    return (
        <>
            <Container maxWidth="lg" sx={{ px: 5, py: 5 }}>
                <Box display="flex" justifyContent="center">
                    <Grid container spacing={3} justifyContent="center">
                        {plans?.map((plan, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <PlanCard plan={plan} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Pricing;