import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';
import theme from './assets/theme';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
