import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './hooks/useAuth';
import AdminPage from './pages/AdminPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage /> } />
      <Route
        path="/login"
        element={ isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage /> }
      />
      <Route
        path="/register"
        element={ isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage /> }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route path="/forgot-password" element={ <ForgotPasswordPage /> } />
      <Route path="/reset-password/:resetToken" element={ <ResetPasswordPage /> } />
    </Routes>
  );
}

export default App;
