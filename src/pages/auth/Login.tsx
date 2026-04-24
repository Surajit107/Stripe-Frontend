import React, { useState } from 'react';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Container, Grid, Box, TextField, Button, Typography, Divider, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/slices/AuthSlice';
import { loginValidationSchema } from '../../helper/FormValidation';
import LoaderSpinner from '../../util/LoaderSpinner';
import BrandLogo from '../../components/common/BrandLogo';
import { stripeTheme } from '../../theme/stripeTheme';

const Login = (): JSX.Element => {
    const { auth_loading } = useSelector((state: any) => state.authSlice);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            credential: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            dispatch(loginUser({ data: values, navigate, resetForm }));
        }
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {/* Loader */}
            <LoaderSpinner
                loading={auth_loading}
            />

            <Container maxWidth="lg" style={{ height: '100vh' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <Grid item md={6} lg={6} marginRight={10}>
                        <img
                            src="/assets/img/flower.jpeg"
                            alt="AI Illustration"
                            style={{ width: '100%', borderRadius: 20 }}
                        />
                    </Grid>
                    <Grid item md={6} lg={5}>
                        <Box component="div">
                            <Box component="div" style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item md={6} lg={2}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            background: `linear-gradient(180deg, ${stripeTheme.blurple} 0%, #5248d9 100%)`,
                                        }}
                                    >
                                        <BrandLogo width="100%" height="100%" />
                                    </Box>
                                </Grid>
                            </Box>

                            <Typography variant="h5" component="p" m={2} textAlign={'center'}>
                                Billing and subscription flow testing with Stripe
                            </Typography>

                            <Box mt={2} component="form" onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="credential"
                                    label="Email Address"
                                    name="credential"
                                    autoComplete="credential"
                                    value={values.credential}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.credential && Boolean(errors.credential)}
                                    helperText={touched.credential && errors.credential}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ padding: '10px 20px', marginTop: '20px' }}
                                >Login
                                </Button>
                                <Typography variant="body2" align="center" mt={2}>
                                    Don't have an account?{' '}
                                    <Link to="/signup">
                                        Signup
                                    </Link>
                                </Typography>
                            </Box>

                            <Divider>
                                <Typography variant="subtitle1" mx={1}>
                                    Or
                                </Typography>
                            </Divider>

                            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                <Typography variant="h6" component="p" mr={2}>
                                    Sign in with
                                </Typography>
                                <IconButton color="primary">
                                    <Google />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Login;