import { Box, Button, Container, Typography, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

function HomePage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    const { user, token } = await authService.googleLogin(tokenResponse.access_token);
    login(user, token);
    navigate('/dashboard');
  };

  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (error) => console.error('Google Login Failed:', error),
  });

  return (
    <Container component="main" maxWidth="sm" sx={ { mt: 8, mb: 4 } }>
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        } }
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Welcome to Our Site
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Join us to get started. You can log in if you already have an account,
          or register for a new one.
        </Typography>
        <Box
          sx={ {
            mt: 4,
            width: '100%',
            maxWidth: 360, // Set a max-width for better appearance on larger screens
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          } }
        >
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={ () => triggerGoogleLogin() }
          >
            Sign in with Google
          </Button>

          <Divider>OR</Divider>

          <Button
            component={ Link }
            to="/login"
            variant="contained"
            size="large"
            fullWidth
          >
            Login with Email
          </Button>
          <Button
            component={ Link }
            to="/register"
            variant="outlined"
            size="large"
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
