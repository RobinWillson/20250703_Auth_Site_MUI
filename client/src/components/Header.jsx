import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={ Link }
          to="/"
          sx={ { flexGrow: 1, color: 'inherit', textDecoration: 'none' } }
        >
          Auth Site
        </Typography>
        { isAuthenticated ? (
          <Box sx={ { display: 'flex', alignItems: 'center' } }>
            <Typography sx={ { mr: 2 } }>Welcome, { user?.name }</Typography>
            <Button color="inherit" onClick={ logout }>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={ Link } to="/login">
            Login
          </Button>
        ) }
      </Toolbar>
    </AppBar>
  );
}

export default Header;