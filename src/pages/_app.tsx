import '../styles/common.sass';
import '../styles/github-markdown.css';
import 'easymde/dist/easymde.min.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../stylesheets/theme';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { SwitchAccount } from '../components/switch-account/SwitchAccount';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material/styles';
import { useStore } from '../rtk/app/store';
import { Provider } from 'react-redux';
import MainPage from '../components/layout/MainPage';
import { ApiProvider } from '../components/api';
import { ResponsiveProvider } from '../components/responsive/ResponsiveContext';
import { AuthProvider } from '../components/auth/AuthContext';
import { appWithTranslation } from 'next-i18next';

import { useDetectAdBlock } from 'adblock-detect-react';
import ModalAdBlock from 'src/components/modal/modal-adblock/ModalAdBlock';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const adBlockDetected = useDetectAdBlock();

  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Subsocial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <ModalAdBlock open={adBlockDetected} />
        <ThemeProvider theme={theme}>
          <ResponsiveProvider>
            <ApiProvider>
              <AuthProvider>
                <Sidebar />
                <Header label={'Subsocial React'} />
                <SwitchAccount />
                <MainPage>
                  <Component {...pageProps} />
                </MainPage>
              </AuthProvider>
            </ApiProvider>
          </ResponsiveProvider>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default appWithTranslation(MyApp);
