import { Box, Grid, Typography, Skeleton } from '@mui/material';
import moment from 'moment';

interface Orders {
  order: {
    billing_type: string;
    value: string;
    user: {
      name: string;
    };
    description: string;
    created_at: string;
  };
  asaasOrder: object;
}

const LastOrders = ({ orders, isLoading }: any) => {
  return (
    <Grid container flexDirection="row" alignItems="center" marginTop={5}>
      {orders.map((_order: Orders, index: number) => {
        const { order, asaasOrder } = _order;
        const date = new Date(order.created_at);

        return (
          <Grid
            container
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
            key={index}
            style={{
              margin: 10,
              padding: 10,
              height: 200,
              width: 250,
              backgroundColor: '#12894c',
              borderRadius: 15,
            }}
          >
            <Grid container flexDirection="row" alignItems="center">
              <Typography marginLeft={1} color="#ccc">
                {order.user.name}
              </Typography>
            </Grid>
            <Grid item alignSelf="flex-start">
              <Typography marginLeft={1} color="#ccc">
                {order.description}
              </Typography>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" flexDirection="row">
              <Grid item >
                <Typography marginRight={1} fontSize={12} color="#ccc">
                  {moment(date).format('DD/MM/YY HH:MM')}
                </Typography>
              </Grid>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={180}
                  style={{ marginLeft: -5 }}
                  sx={{ fontSize: '2rem' }}
                />
              ) : (
                <Typography
                  marginRight={1}
                  color="#ccc"
                  fontWeight={500}
                  fontSize={25}
                >
                  R$ {order.value.toString().replace('.', ',')}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LastOrders;
