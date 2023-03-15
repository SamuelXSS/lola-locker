import React, { useState, useEffect } from 'react';
import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SidePanel from '../../layout/SidePanel';
import api from '../../services/api';

const Settings: React.FC = () => {
  const [health, setHealth] = useState({} as any);
  const [services, setServices] = useState({
    env: 'Server',
    appKey: 'Server Auth',
    lucid: 'Database',
    redis: 'Redis',
  } as any);
  useEffect(() => {
    async function loadHealth() {
      try {
        const {
          data: { report },
        } = await api.get('/health');

        setHealth(report);
      } catch (err: any) {
        setHealth(err.response.data.report);
      }
    }

    loadHealth();
  }, []);

  console.log(health);

  return (
    <Box sx={{ flex: 1 }}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SidePanel>
          <Grid container justifyContent="center">
            <Typography color="#ccc" fontSize={20}>
              Server Status
            </Typography>
            <Grid container justifyContent="center">
              {Object.keys(services).map((key, index) => {
                const serviceName = Object.keys(health).map(
                  (key) => services[key]
                );
                console.log(serviceName[index]);
                return (
                  <Grid
                    container
                    flexDirection="column"
                    justifyContent="space-between"
                    style={{
                      width: 150,
                      height: 80,
                      padding: 10,
                      margin: 10,
                      backgroundColor: '#4d1960',
                      borderRadius: 10,
                    }}
                    key={index}
                  >
                    {serviceName[index] ? (
                      <Grid item>
                        <Typography color="#ccc">
                          {serviceName[index]}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Skeleton
                          variant="text"
                          width={130}
                          style={{ marginLeft: 0 }}
                          sx={{ fontSize: '2rem' }}
                        />
                      </Grid>
                    )}
                    {serviceName[index] ? (
                      <Grid item>
                        <Typography
                          color={
                            health[key]?.health.healthy ? '#2ed13a' : '#d12e2e'
                          }
                        >
                          {health[key]?.health.healthy ? 'UP' : 'DOWN'}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item></Grid>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </SidePanel>
      </Grid>
    </Box>
  );
};

export default Settings;
