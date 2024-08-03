import { Box, Typography } from "@mui/material";

const Home = (): JSX.Element => {
    return (
        <>
            <Box sx={{ textAlign: 'center', m: 2 }}>
                <Typography variant="h2" component="div" sx={{ lineHeight: 1, color: '#413b3b' }}>
                    {("Stripe Subscription Test").toUpperCase()}
                </Typography>
            </Box>
        </>
    );
};

export default Home;