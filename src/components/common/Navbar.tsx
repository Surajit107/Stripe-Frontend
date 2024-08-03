import { MouseEvent, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../../services/reducers/AuthSlice';
import { showToast } from '../../helper/Toast';
import { Dispatch } from 'redux';
import { DecryptData } from '../../helper/EncryptDecrypt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { useTheme } from '../../services/ThemeContext';
import { MaterialUISwitch } from '../../helper/MaterialUISwitch';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: '0px 2px 8px rgb(95 104 111)',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(232, 248, 245, 0.5)' : 'rgba(0, 0, 0, 0.7)',
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#212F3C' : '#f5f5f5',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginRight: '20px',
    transition: '0.3s ease',
    padding: '5px',
    borderRadius: '4px',
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.mode === 'light' ? '#9B59B6' : '#ff9800',
    },
}));

const Logo = styled('img')({
    width: '80px',
});

const ProfileAvatar = styled(Avatar)({
    width: '30px',
    height: '30px',
    marginRight: '5px',
});

const Navbar = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();
    const token: string | null = window.localStorage.getItem('token');
    const _TOKEN = DecryptData(token ?? 'null');
    const user: string | null = window.localStorage.getItem('user');
    const _USER_DATA = DecryptData(user ?? 'null');

    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const userLogout = () => {
        handleClose();
        dispatch(logoutUser(navigate));
    };

    useEffect(() => {
        if (_TOKEN) {
            const decodedJwt = jwtDecode(_TOKEN);
            const isExpired = decodedJwt?.exp ? decodedJwt.exp < Date.now() / 1000 : false;
            if (isExpired) {
                dispatch(logoutUser(navigate));
                showToast({
                    message: "Session Expired. You've been logged out. Please sign in again.",
                    type: 'error',
                    durationTime: 4000,
                    position: 'top-center',
                });
            }
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, _TOKEN]);

    return (
        <>
            <StyledAppBar position="static">
                <Toolbar>
                    <RouterLink to="/">
                        <Logo src="/assets/img/logo.png" alt="Logo" />
                    </RouterLink>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navLinks.map((link, index) => (
                            <StyledLink key={index} to={link.to}>
                                {link.label}
                            </StyledLink>
                        ))}
                    </Box>

                    {_TOKEN ? (
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <StyledLink
                                to="#"
                                onClick={handleClick}
                                style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}
                            >
                                <ProfileAvatar alt="User Avatar" src="/path/to/avatar.jpg" />
                                {_USER_DATA?.name}
                            </StyledLink>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => navigate('/profile')}>
                                    <AccountCircleIcon style={{ marginRight: '5px' }} />
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={userLogout}>
                                    <LogoutIcon style={{ marginRight: '10px' }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <StyledLink to="/login">
                            Login
                        </StyledLink>
                    )}

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="theme toggle"
                        onClick={toggleTheme}
                    >
                        <MaterialUISwitch checked={theme === 'dark'} />
                    </IconButton>
                </Toolbar>
            </StyledAppBar>
        </>
    );
};

export default Navbar;