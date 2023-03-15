import { toast } from 'react-toastify';

const Notify = (text: string, type: string) => {
  const toaster = type === 'success' ? toast.success : toast.error;
  return toaster(text, {
    position: 'bottom-center',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  });
};

export default Notify;
