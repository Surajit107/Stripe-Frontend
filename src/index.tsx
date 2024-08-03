import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Provider } from 'react-redux';
import ProtectedOne from './routes/private/ProtectedOne';
import Success from './pages/others/Success';
import Cancel from './pages/others/Cancel';
import { Toaster } from 'react-hot-toast';
import Store from './services/store/Store';
import { ThemeProvider } from './services/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={Store}>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedOne />}>
            <Route path='*' element={<App />} />
            <Route path='/success/:_sessionID' element={<Success />} />
            <Route path='/cancel/:_sessionID' element={<Cancel />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      <Toaster
        reverseOrder={false}
        gutter={10}
      />
    </ThemeProvider>
  </Provider>
);

reportWebVitals();