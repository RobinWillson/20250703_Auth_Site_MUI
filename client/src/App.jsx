import { Box } from '@mui/material';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

// Layout for pages that should have a Header and Footer
const AppLayout = () => (
  <Box sx={ { display: 'flex', flexDirection: 'column', minHeight: '100vh' } }>
    <Header />
    {/* The Outlet component renders the matched child route's element */ }
    <Outlet />
    <Footer />
  </Box>
);

function App() {
  return (
    <Routes>
      {/* Public routes that render without the main layout */ }
      <Route path="/" element={ <HomePage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage /> } />

      {/* Protected routes are nested inside the ProtectedRoute component */ }
      <Route element={ <ProtectedRoute /> }>
        {/* Routes inside here are protected and will also use the AppLayout */ }
        <Route element={ <AppLayout /> }>
          <Route path="/dashboard" element={ <MainContent /> } />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
