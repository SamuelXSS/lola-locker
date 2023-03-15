import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Input';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { ContentCopy, Edit, Visibility, VisibilityOff } from '@mui/icons-material';

export default function ShowPasswordDialog({
  open,
  setClose,
  service,
  password,
  setPassword,
}: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [editPasswordDisabled, setEditPasswordDisabled] = React.useState(true);
  const handleClose = () => {
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
        <DialogTitle id="alert-dialog-title">Senha {service}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input
              value={password}
              type={showPassword ? 'text' : 'password'}
              disabled={editPasswordDisabled}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Trocar senha (irá apagar a antiga)">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setEditPasswordDisabled(false);
                          setPassword('');
                        }}
                        style={{ marginLeft: 5 }}
                        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                          e.preventDefault()
                        }
                        edge="end"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Copiar senha">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => navigator.clipboard.writeText(password)}
                        style={{ marginLeft: 5 }}
                        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                          e.preventDefault()
                        }
                        edge="end"
                      >
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
