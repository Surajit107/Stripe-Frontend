import { useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import AllRoutes from './routes/AllRoutes';
import LoaderSpinner from './util/LoaderSpinner';
import { useTheme } from './services/ThemeContext';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';

const App = (): JSX.Element => {
  const { subscription_loading } = useSelector((state: any) => state.subscriptionSlice);
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });


  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-color',
      theme === 'light'
        ? 'var(--background-color-light)'
        : 'var(--background-color-dark)'
    );
  }, [theme]);

  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <LoaderSpinner
          loading={subscription_loading}
        />
        <Navbar />
        <AllRoutes />
      </MuiThemeProvider>
    </>
  );
};

export default App;