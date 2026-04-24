import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PersonOutline from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../../services/slices/AuthSlice';
import { showToast } from '../../helper/Toast';
import { Dispatch } from 'redux';
import { DecryptData } from '../../helper/EncryptDecrypt';
import BrandLogo from './BrandLogo';
import { stripeTheme } from '../../theme/stripeTheme';

const StyledAppBar = styled(AppBar)({
    boxShadow: '0px 2px 8px rgba(10, 37, 64, 0.12)',
    background: `linear-gradient(180deg, ${stripeTheme.blurple} 0%, #5248d9 100%)`,
});

const StyledLink = styled(RouterLink)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginRight: '20px',
    transition: '0.3s ease',
    padding: '5px',
    borderRadius: '4px',
    textDecoration: 'none',
    '&:hover': {
        color: stripeTheme.blurple,
        backgroundColor: '#fff',
    },
}));

const LogoWrap = styled('span')({
    display: 'inline-flex',
    width: '140px',
    height: '42px',
});

const Navbar = (): JSX.Element => {
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const isUserMenuOpen = Boolean(userMenuAnchor);

    const token: string | null = window.localStorage.getItem('token');
    const _TOKEN = DecryptData(token ?? 'null');
    const userJson: string | null = window.localStorage.getItem('user');
    const userData = DecryptData(userJson ?? 'null') as { name?: string; email?: string } | null;
    const displayName: string = userData?.name?.trim() || userData?.email?.trim() || 'User';

    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();

    const userLogout = () => {
        setUserMenuAnchor(null);
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
        <StyledAppBar position="static">
            <Toolbar>
                <RouterLink to="/">
                    <LogoWrap aria-label="Stripe Testing home">
                        <BrandLogo width="100%" height="100%" />
                    </LogoWrap>
                </RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                {_TOKEN ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ml: 1,
                        }}
                    >
                        <Button
                            id="user-menu-button"
                            color="inherit"
                            onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                            startIcon={
                                <AccountCircle
                                    sx={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.95)' }}
                                />
                            }
                            endIcon={
                                <KeyboardArrowDown
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        transform: isUserMenuOpen ? 'rotate(180deg)' : 'none',
                                    }}
                                />
                            }
                            aria-controls={isUserMenuOpen ? 'user-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isUserMenuOpen}
                            sx={{
                                textTransform: 'none',
                                maxWidth: { xs: 200, sm: 260 },
                                color: 'rgba(255, 255, 255, 0.95)',
                            }}
                        >
                            <Typography
                                component="span"
                                noWrap
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                            >
                                {displayName}
                            </Typography>
                        </Button>
                        <Menu
                            id="user-menu"
                            anchorEl={userMenuAnchor}
                            open={isUserMenuOpen}
                            onClose={() => setUserMenuAnchor(null)}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: { minWidth: 200, mt: 0.5 },
                                },
                            }}
                        >
                            <MenuItem
                                component={RouterLink}
                                to="/profile"
                                onClick={() => setUserMenuAnchor(null)}
                            >
                                <ListItemIcon>
                                    <PersonOutline fontSize="small" />
                                </ListItemIcon>
                                My Profile
                            </MenuItem>
                            <MenuItem onClick={userLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
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
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;