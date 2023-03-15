import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Input';
import { createLocker, getPlatforms } from '../../services/methods';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Platform {
  id: string;
  name: string;
  image: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export default function CreateNewPasswordDialog({
  open,
  setClose,
  setCreatedPassword,
}: any) {
  const [platform, setPlatform] = useState({} as Platform);
  const [platforms, setPlatforms] = useState([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setClose();
  };

  useEffect(() => {
    const loadPlatforms = async () => {
      const platforms = await getPlatforms();

      setPlatforms(platforms);
    };

    loadPlatforms();
  }, []);

  const handleCreateNewPassword = async () => {
    const locker = await createLocker({ platformId: platform.id, password });

    setCreatedPassword(locker);

    setClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Criar nova senha</DialogTitle>
        <DialogContent>
          <Grid item style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Plataforma</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={platform}
                label="Plataforma"
                onChange={(e) => setPlatform(e.target.value as Platform)}
              >
                {platforms.map((plat: any) => {
                  return <MenuItem value={plat}>{plat.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Input
              variant="standard"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="button" onClick={handleCreateNewPassword} autoFocus>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
