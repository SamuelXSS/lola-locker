import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const menu1 = [
  {
    name: 'Dashboard',
    slug: 'dashboard',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  { name: 'Clientes', slug: 'clients', icon: <GroupIcon />, path: 'clients' },
  { name: 'Pedidos', slug: 'orders', icon: <BookOnlineIcon />, path: 'orders' },
];

const menu2 = [
  {
    name: 'Configurações',
    slug: 'settings',
    icon: <SettingsIcon />,
    path: 'settings',
  },
];

export { menu1, menu2 };
