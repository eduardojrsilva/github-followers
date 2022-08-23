import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ToastProvider } from './Toast';
import { UserProvider } from './UserProvider';

import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <ToastProvider>
          <UserProvider>{children}</UserProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
