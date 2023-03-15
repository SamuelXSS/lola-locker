import {
  Grid,
  Button,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import Notify from '../../components/Toast';
import { Person, Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { Login } = useAuth();

  const handleLogin = async () => {
    const login = await Login(nickname, password);

    if (login.status === 404 || login.status === 401)
      return Notify('Usuário ou senha inválidos', 'error');

    navigate('/');
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="/images/linux.png"
          alt="linux"
          height={100}
          style={{ marginTop: 100 }}
        />
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#ccc',
            textDecoration: 'none',
          }}
        >
          LOLA LOCKER
        </Typography>
        <Grid item>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            label="Usuário"
            type="text"
            variant="standard"
            style={{ marginTop: 20, width: 220 }}
            autoComplete="off"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ marginRight: 5 }}
                  onKeyDown={(e) => {
                    if (e.key === 'tab') e.preventDefault();
                  }}
                >
                  <Person htmlColor="#ccc" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            style={{ marginTop: 20, width: 220 }}
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ marginRight: 5 }}>
                  <Tooltip
                    title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.preventDefault()
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff htmlColor="#ccc" />
                      ) : (
                        <Visibility htmlColor="#ccc" />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            sx={{ marginTop: 3, marginBottom: 2 }}
            color="primary"
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
