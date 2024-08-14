import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 
import './CSS/Login1.css'; 
import Navbar from '../Components/Navbar/Navbar';
import axios from 'axios';

const defaultTheme = createTheme();

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const adminCredentials = { email: 'admin123@gmail.com', password: 'admin@123' };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,}$/.test(newPassword));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsEmailTouched(true);
    setIsPasswordTouched(true);
  
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,}$/.test(password);
  
    setIsEmailValid(emailValid);
    setIsPasswordValid(passwordValid);
  
    if (emailValid && passwordValid) {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        navigate('/admindashboard');
      } else {
        try {
          const response = await axios.get('http://localhost:8080/student/all');
          const studentsData = response.data;
          const loggedInStudent = studentsData.find(student =>
            student.email.trim().toLowerCase() === email.trim().toLowerCase() &&
            student.password.trim() === password.trim()
          );
  
          if (loggedInStudent) {
            localStorage.setItem('user', JSON.stringify({ email: email, role: 'student' }));
            localStorage.setItem('currentId', JSON.stringify(loggedInStudent)); // Store all user details
            localStorage.setItem('studentId', loggedInStudent.studentId); // Store only the student ID
            alert('Logged in successfully!');
            navigate('/profile');
          } else {
            alert('No account exists with this email.');
            const createNewAccount = window.confirm('Are you a new user? Click OK to create a new account or Cancel to return.');
            if (createNewAccount) {
              navigate('/signup');
            }
          }
        } catch (error) {
          console.error('Error checking credentials:', error);
          alert('An error occurred while checking credentials. Please try again.');
        }
      }
    } else {
      alert('Invalid email or password format.');
    }
  };  

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" className='login-wrapper1'>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            className='login-image-login1'
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '80vh',
                justifyContent: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'teal' }} className='avatar1'>
                <LockOutlinedIcon sx={{ color: 'white' }} />
              </Avatar>
              <Typography component="h1" variant="h5" className='login-title1'>
                Log In
              </Typography>
              <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '60%' }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!isEmailValid && isEmailTouched}
                  helperText={!isEmailValid && isEmailTouched && "Please enter a valid email address."}
                  className={!isEmailValid && isEmailTouched ? 'invalid' : ''}
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!isPasswordValid && isPasswordTouched}
                  helperText={!isPasswordValid && isPasswordTouched && "Password must be at least 8 characters long and include at least one special character."}
                  className={!isPasswordValid && isPasswordTouched ? 'invalid' : ''}
                  required
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={<Typography className='login-agree-text1'>By continuing, I agree to the terms of use and privacy policy.</Typography>}
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '52px', fontSize: '16px', fontWeight: 300, backgroundColor: 'teal', '&:hover': { backgroundColor: 'white', color: 'teal' } }}
                  className='login-button1'
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2" className='login-link1'>
                      Don&apos;t have an account? { "Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Typography variant="body2" color="black" align="center" sx={{ mt: 5 }}>
                  {'Copyright © '}
                  <Link color="inherit" href="https://mui.com/">
                    TutorTrack
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Login1;
