import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './routes/AppRouter';
import { ToastProvider } from './lib/providers/ToastContext';
import Toast from './components/Toast';
import { SigninProvider } from './lib/providers/SigninContext';
import { PaginationProvider } from './lib/providers/PaginationContext';
import { FormProvider } from './lib/providers/FormContext';
import { UserDataProvider } from './lib/providers/UserDataContext';
import { useOnlineStatus } from './lib/hooks/useOnlineStatus';

function App() {

  const queryClient = new QueryClient();
  useOnlineStatus()
  
  return (
    <QueryClientProvider client={queryClient}>
      <SigninProvider>
        <ToastProvider>
          <PaginationProvider>
            <FormProvider>
              <UserDataProvider>
                <BrowserRouter>
                  <Toast />
                  <AppRouter />
                </BrowserRouter>
              </UserDataProvider>
            </FormProvider>
          </PaginationProvider>
        </ToastProvider>
      </SigninProvider>
    </QueryClientProvider>
  )
}

export default App
