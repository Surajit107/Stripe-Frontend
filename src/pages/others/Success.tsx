import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled, darken } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { useCallback, useEffect, useMemo } from "react";
import { successPaymentRequest } from "../../services/reducers/SubscriptionSlice";

const PlanButton = styled(Button)(({ theme }) => {
    const backgroundColor = '#00b200';
    const hoverColor = darken(backgroundColor, 0.2);

    return {
        padding: '10px 30px',
        textTransform: 'uppercase',
        fontWeight: 500,
        backgroundColor,
        color: '#fff',
        '&:hover': {
            backgroundColor: hoverColor,
        },
    };
});

const Success = (): JSX.Element => {
    const { _sessionID } = useParams();

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');
    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);


    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();

    // handleProceed func.
    const handleProceed = useCallback(() => {
        dispatch(successPaymentRequest({ _sessionID, header }));
    }, [_sessionID, header, dispatch]);

    useEffect(() => {
        handleProceed();
    }, [handleProceed]);


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Card sx={{
                    width: 500,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: "#e7ffd5",
                }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#00b200', mb: 2 }} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Payment Successfull
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <PlanButton size="medium" color="primary" onClick={() => navigate('/profile')}>
                            Proceed
                        </PlanButton>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
};

export default Success;