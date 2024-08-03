import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled, darken } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { useCallback, useEffect, useMemo } from "react";
import { successPaymentRequest } from "../../services/reducers/SubscriptionSlice";

const PlanButton = styled(Button)(({ theme }) => {
    const backgroundColor = '#b20000';
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

const Cancel = (): JSX.Element => {
    const navigate: any = useNavigate();
    const { _sessionID } = useParams();

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');
    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);


    const dispatch: Dispatch<any> = useDispatch();

    // handleProceed func.
    const handleProceed = useCallback(() => {
        dispatch(successPaymentRequest({ _sessionID, header }));
    }, [_sessionID, header, dispatch]);

    useEffect(() => {
        handleProceed();
    }, [handleProceed]);

    return (
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
                background: "#ffd5d5",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <CancelIcon sx={{ fontSize: 100, color: '#b20000', mb: 2 }} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Payment Cancelled
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
                    <PlanButton size="medium" color="primary" onClick={() => navigate('/')}>
                        Go to home page
                    </PlanButton>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Cancel;