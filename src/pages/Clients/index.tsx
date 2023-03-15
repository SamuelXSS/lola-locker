import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SidePanel from '../../layout/SidePanel';

const Clients: React.FC = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SidePanel></SidePanel>
      </Grid>
    </Box>
  );
};

export default Clients;
