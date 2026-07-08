import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SecurityIcon from '@mui/icons-material/Security';
import { useAuthStore } from '../store/auth.store';
import { loginSchema, type LoginSchemaType } from '../schemas/visitor.schema';
import { useTheme } from '@mui/material/styles';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchemaType) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
        background:
          theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`
            : `linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #16213e 100%)`,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          boxShadow: 24,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                bgcolor: 'primary.main',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <SecurityIcon sx={{ fontSize: 36, color: 'white' }} />
            </Box>
            <Typography variant="h5" fontWeight={700}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Visitor Management System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              margin="normal"
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{
                 '& input:-webkit-autofill': {
                   WebkitBoxShadow: '0 0 0 1000px #1a1d27 inset',
                   WebkitTextFillColor: '#fff',
                   border: 'none'              
                     },
      }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              margin="normal"
              {...register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{
                 '& input:-webkit-autofill': {
                   WebkitBoxShadow: '0 0 0 1000px #1a1d27 inset',
                   WebkitTextFillColor: '#fff',
                   border: 'none'              
                     },
      }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 1.5 }}>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5} fontWeight={600}>
              Demo Credentials
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Admin: admin@vms.com / admin123
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Security: security@vms.com / security123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
