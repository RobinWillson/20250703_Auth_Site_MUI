import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@mui/material';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', formData);
      // Proceed with registration logic (e.g., API call)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={ {
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={ handleSubmit } sx={ { mt: 3 } }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <TextField name="name" required fullWidth id="name" label="Name" value={ formData.name } onChange={ handleChange } error={ !!errors.name } helperText={ errors.name } autoFocus />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField required fullWidth id="email" label="Email Address" name="email" value={ formData.email } onChange={ handleChange } error={ !!errors.email } helperText={ errors.email } />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" value={ formData.password } onChange={ handleChange } error={ !!errors.password } helperText={ errors.password } />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={ formData.confirmPassword } onChange={ handleChange } error={ !!errors.confirmPassword } helperText={ errors.confirmPassword } />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={ { mt: 3, mb: 2 } }>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={ RouterLink } to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
