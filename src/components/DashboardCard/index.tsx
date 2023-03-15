import { CircularProgress, Grid } from '@mui/material';
import { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import CreateNewPasswordDialog from '../Dialogs/CreateNewPassword';
import ShowPasswordDialog from '../Dialogs/ShowPassword';

import './styles.css';

interface Cards {
  name: string;
  password: string;
  image: any;
}

const DashboardCard = ({
  cards,
  colors,
  setColors,
  isLoading,
  setCreatedPassword,
}: any) => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showCreatePasswordDialog, setShowCreatePasswordDialog] =
    useState(false);
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');

  const handleOpen = () => setShowPasswordDialog(true);
  const handleOpenCreatePassword = () => setShowCreatePasswordDialog(true);
  const handleClose = () => setShowPasswordDialog(false);
  const handleCloseCreatePassword = () => setShowCreatePasswordDialog(false);

  const showDialogAndSetPassword = (name: string, pass: string) => {
    setPassword(pass);
    setService(name);
    setShowPasswordDialog(true);
  };

  return (
    <Grid
      container
      flexDirection="row"
      marginTop={10}
      justifyContent="center"
      alignItems="center"
      style={{ transition: 'all 0.3s ease-out 0s' }}
    >
      {cards.length > 0 && (
        <ColorExtractor
          src={cards[cards.length - 1].image}
          getColors={(color: any) => setColors(color)}
        />
      )}
      {isLoading && <CircularProgress size={40} />}
      {cards.length > 0 &&
        cards.map((card: Cards, index: number) => {
          return (
            <Grid
              container
              key={index}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              className="card-container"
              onClick={() => showDialogAndSetPassword(card.name, card.password)}
              margin={1}
              sx={{
                width: 140,
                height: 90,
                boxShadow: '0px 2px 5px #ccc',
              }}
            >
              <Grid item xs style={{ transition: 'all 0.3s ease-out 0s' }}>
                <img
                  src={card.image}
                  style={{ backgroundSize: 'cover', width: 140, height: 90 }}
                  alt={card.name}
                />
              </Grid>
            </Grid>
          );
        })}
      <ShowPasswordDialog
        open={showPasswordDialog}
        setOpen={handleOpen}
        setClose={handleClose}
        password={password}
        setPassword={setPassword}
        service={service}
      />
      <CreateNewPasswordDialog
        open={showCreatePasswordDialog}
        setClose={handleCloseCreatePassword}
        setCreatedPassword={setCreatedPassword}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="card-container-new"
        margin={1}
        style={{
          width: 140,
          height: 90,
          background: `linear-gradient(${colors[0]}, ${colors[1]}, ${colors[2]})`,
        }}
      >
        <Grid item onClick={handleOpenCreatePassword}>
          <img
            src="/images/add.png"
            alt="add"
            style={{
              backgroundSize: 'cover',
              width: 64,
              height: 64,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardCard;
