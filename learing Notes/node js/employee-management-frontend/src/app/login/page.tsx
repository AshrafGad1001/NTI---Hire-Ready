'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert 
} from '@mui/material';
import api from '@/utils/axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success && res.data.data.accessToken) {
        localStorage.setItem('access_token', res.data.data.accessToken);
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 5, width: '100%', borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Sign in to manage employees
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
