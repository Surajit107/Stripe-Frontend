import { Container, Paper, Typography, Avatar, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { DecryptData } from '../../helper/EncryptDecrypt';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '../../config/App.config';
import { showToast } from '../../helper/Toast';
import ConfModal from '../../util/ConfModal';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useEffect, useMemo, useState } from 'react';
import { cancelSubRequest, subDetailsRequest, subPlanRefundRequest } from '../../services/reducers/SubscriptionSlice';

const ProfileContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
});

const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '480px',
    width: 800,
    textAlign: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#333333',
    boxShadow: theme.palette.mode === 'light' ? '0px 3px 15px rgba(0, 0, 0, 0.1)' : '0px 3px 15px rgba(255, 255, 255, 0.1)',
}));

const ProfileAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
});

type profilePage_props = {
    _TOKEN: string;
}

const Profile = ({ _TOKEN }: profilePage_props): JSX.Element => {
    const { subs_details_data } = useSelector((state: any) => state.subscriptionSlice);
    const dispatch: Dispatch<any> = useDispatch();

    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'cancel' | 'refund' | null>(null);

    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');


    const handleViewPlan = async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${_TOKEN}`
        };
        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/billing-portal`, {
                headers: headers,
            });
            window.location.href = response?.data?.data?.url;
        } catch (error: any) {
            console.error('Error opening billing portal:', error);
            showToast({
                message: error?.response?.data?.message,
                type: 'error',
                durationTime: 4500,
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

    const handleConfirmCancel = () => {
        dispatch(cancelSubRequest(header));
        handleCloseModal();
    };

    const handleConfirmRefund = () => {
        handleRequestRefund();
        handleCloseModal();
    };

    const handleRequestRefund = () => {
        dispatch(subPlanRefundRequest(header));
    };

    useEffect(() => {
        if (_USER_DATA?.subscription?.customerId) {
            dispatch(subDetailsRequest(header));
        }
    }, [dispatch, header, _USER_DATA?.subscription?.customerId]);


    return (
        <>
            <ProfileContainer>
                <ProfilePaper>
                    <ProfileAvatar alt="User Avatar" src="/path/to/avatar.jpg" />
                    <Typography variant="h5" component="h1">
                        {_USER_DATA?.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {_USER_DATA?.email}
                    </Typography>
                    {_USER_DATA?.is_subscribed ?
                        <Box sx={{ marginTop: "25px" }}>
                            <Typography variant="h4" color="textSecondary">
                                Plan Details
                            </Typography>
                            <Typography variant="subtitle1">
                                Package Name: {subs_details_data?.product?.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                Amount: ${subs_details_data?.subscription?.plan?.amount / 100} USD/month
                            </Typography>
                            <Typography variant="subtitle1">
                                Start Date: {new Date(subs_details_data?.subscription?.start_date * 1000).toLocaleDateString()}
                            </Typography>
                            <Typography variant="subtitle1">
                                End Date: {new Date(subs_details_data?.subscription?.current_period_end * 1000).toLocaleDateString()}
                            </Typography>
                        </Box>
                        : <Typography variant="h4" color="textSecondary" sx={{ marginTop: 10 }}>
                            No Plan Activated
                        </Typography>
                    }
                    <Box sx={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        {_USER_DATA?.is_subscribed &&
                            <Button variant="contained" style={{ backgroundColor: "#673de6" }} onClick={handleViewPlan}>
                                View Plan
                            </Button>
                        }
                        {_USER_DATA?.is_subscribed &&
                            <Button variant="contained" color="error" onClick={handleOpenCancelModal}>
                                Cancel Plan
                            </Button>
                        }
                        <Button variant="contained" color="warning" onClick={handleOpenRefundModal}>
                            Request Refund
                        </Button>
                    </Box>
                </ProfilePaper>
            </ProfileContainer>

            {/* Confirmation Modal */}
            <ConfModal
                modalId="confirm-action-modal"
                modalHeading={modalType === 'cancel' ? "Confirm Cancellation" : "Request Refund"}
                modalContent={modalType === 'cancel'
                    ? "Are you sure you want to cancel your subscription?"
                    : "Are you sure you want to request a refund? This action may be irreversible."}
                onDelete={modalType === 'cancel' ? handleConfirmCancel : handleConfirmRefund}
                open={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Profile;