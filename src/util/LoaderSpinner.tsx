import { CircularProgress, Backdrop } from '@mui/material';

type LoaderSpinner_props = {
    loading: boolean
}

const LoaderSpinner = ({ loading }: LoaderSpinner_props) => {
    return (
        <>
            <Backdrop style={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default LoaderSpinner;