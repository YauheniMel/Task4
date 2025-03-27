import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes';
import { useAppSelector } from './redux/store';
import { shareIsLoadingSelector } from './redux/selectors/share-selector';
import { theme } from './styles/theme';

const App = () => {
  const isLoading = useAppSelector(shareIsLoadingSelector);

  if (isLoading) return <>Loading</>;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRoutes />
        <ToastContainer
          progressClassName="toastProgressBar"
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
