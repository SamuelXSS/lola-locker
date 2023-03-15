import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar, Grid, Tooltip } from '@mui/material';
import { menu1, menu2 } from './menu';
import { useAuth } from '../../contexts/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled('div')<AppBarProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  height: '100%',
  padding: theme.spacing(0, 1),
  marginBottom: 20,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface IProps {
  children?: React.ReactNode;
}

const SidePanel: React.FC<IProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { Logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const location = pathname.split('/')[1];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer
        PaperProps={{
          sx: { backgroundColor: '#18141c' },
        }}
        variant="permanent"
        style={{ background: '#1f1b25' }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon color="secondary" />
            ) : (
              <ChevronLeftIcon color="secondary" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          style={{ borderColor: '#999999', width: '90%', alignSelf: 'center' }}
        />
        <List>
          {menu1.map((menu, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', color: '#ccc' }}
              onClick={() => navigate(`/${menu.path}`)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location === menu.slug ? '#7F3999' : '#ccc',
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location === menu.slug ? '#7F3999' : '#ccc',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          style={{ borderColor: '#999999', width: '90%', alignSelf: 'center' }}
        />
        <List>
          {menu2.map((menu, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', color: '#ccc' }}
              onClick={() => navigate(`/${menu.path}`)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location === menu.slug ? '#7F3999' : '#ccc',
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location === menu.slug ? '#7F3999' : '#ccc',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <DrawerFooter>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ opacity: open ? 1 : 0 }}
          >
            <Avatar src="/images/logo.png" sx={{ height: 70, width: 70 }} />
            <Typography color="#ccc"> Samuel Ximenes </Typography>
          </Grid>
        </DrawerFooter>
        <Grid container alignItems="center" justifyContent="center">
          <Tooltip title="Sair" placement="right">
            <IconButton onClick={handleLogout} sx={{ marginBottom: 2 }}>
              <LogoutIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default SidePanel;
