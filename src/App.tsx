import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AllRoutes from './routes/AllRoutes';
import LoaderSpinner from './util/LoaderSpinner';
import { useSelector } from 'react-redux';

const App = (): JSX.Element => {
  const { subscription_loading } = useSelector((state: any) => state.subscriptionSlice);

  return (
    <>
      {/* Loader */}
      <LoaderSpinner
        loading={subscription_loading}
      />
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;