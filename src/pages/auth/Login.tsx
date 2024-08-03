import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Container, Grid, Box, TextField, Button, Typography, IconButton, InputAdornment, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { loginValidationSchema } from '../../helper/FormValidation';
import LoaderSpinner from '../../util/LoaderSpinner';
import { loginRequest } from '../../services/reducers/AuthSlice';
import { useTheme } from '../../services/ThemeContext';

const Login = (): JSX.Element => {
    const { auth_loading } = useSelector((state: any) => state.authSlice);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();
    const { theme } = useTheme();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            credential: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            dispatch(loginRequest({ data: values, navigate, resetForm }));
        }
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const textColor = theme === 'light' ? '#000' : '#fff';
    const inputBorderColor = theme === 'light' ? '#ccc' : '#555';
    const labelColor = theme === 'light' ? '#000' : '#fff';
    const eyeIconColor = theme === 'light' ? '#000' : '#fff';
    const linkColor = theme === 'light' ? '#673de6' : '#f00';

    return (
        <>
            <Box style={{ height: '100vh', backgroundColor: (theme === 'light' ? "#fff" : "#333") }}>
                <LoaderSpinner loading={auth_loading} />

                <Container maxWidth="lg" style={{ height: '100vh' }}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                        <Grid item md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' }, marginRight: 10 }}>
                            <img
                                src="/assets/img/login-img.jpg"
                                alt="AI Illustration"
                                style={{ width: '100%', borderRadius: 20 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <Box component="div">
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
                                        InputLabelProps={{
                                            sx: { color: labelColor }
                                        }}
                                        InputProps={{
                                            sx: {
                                                input: { color: textColor },
                                                fieldset: { borderColor: inputBorderColor }
                                            }
                                        }}
                                        placeholder="Enter your email"
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
                                        InputLabelProps={{
                                            sx: { color: labelColor }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                        sx={{ color: eyeIconColor }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                input: { color: textColor },
                                                fieldset: { borderColor: inputBorderColor }
                                            }
                                        }}
                                        placeholder="Enter your password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: "#673de6" }}
                                    >
                                        Login
                                    </Button>
                                    <Typography variant="body2" align="center" mt={2} color={labelColor}>
                                        Don't have an account?{' '}
                                        <MuiLink component={Link} to="/signup" sx={{ color: linkColor }}>
                                            Signup
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Login;
