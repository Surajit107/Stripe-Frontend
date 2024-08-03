import * as Yup from 'yup';

// login validation
export const loginValidationSchema = Yup.object({
    credential: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().required('Password is required'),
});

// signup validation
export const signupValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string()
        .min(8, 'Password should be minimum 8 characters long')
        .max(16, 'Password should be maximum 16 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])([a-zA-Z0-9@#$%^&*+=._-]){8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number & one special character'
        )
        .required('Password is required'),
});

// email validation
export const emailValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
});

// forget password validation
export const passwordValidationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password should be minimum 8 characters long')
        .max(16, 'Password should be maximum 16 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])([a-zA-Z0-9@#$%^&*+=._-]){8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number & one special character'
        )
        .required('Password is required'),
    conf_password: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});