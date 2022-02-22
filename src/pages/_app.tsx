import '../styles/common.sass';
import '../styles/github-markdown.sass';
import 'easymde/dist/easymde.min.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../stylesheets/theme';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { SwitchAccount } from '../components/switch-account/SwitchAccount';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material/styles';
import { useStore } from '../store/app/store';
import { Provider } from 'react-redux';
import MainPage from '../components/layout/MainPage';
import { ApiProvider } from '../components/api';
import { ResponsiveProvider } from '../components/responsive/ResponsiveContext';
import { AuthProvider } from '../components/auth/AuthContext';
import { useDetectAdBlock } from 'adblock-detect-react';
import ModalAdBlock from 'src/components/modal/modal-adblock/ModalAdBlock';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { useState } from 'react';

import i18n from '../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const adBlockDetected = useDetectAdBlock();
  const { t } = useTranslation();
  const [ isShowingMobileBurger, setIsShowingMobileBurger ] = useState(false);
  const handleMobileBurgerClick = () => {
    setIsShowingMobileBurger(current => !current);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>{t('general.title')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ModalAdBlock open={adBlockDetected} />
          <ThemeProvider theme={theme}>
            <ResponsiveProvider>
              <ApiProvider>
                <AuthProvider>
                  <Sidebar
                    isShowingMobileBurger={isShowingMobileBurger}
                    onSidebarClose={handleMobileBurgerClick}
                  />
                  <Header
                    label={t('general.title')}
                    onMobileBurgerClick={handleMobileBurgerClick}
                    isShowingMobileBurger={isShowingMobileBurger}
                  />
                  <SwitchAccount />
                  <MainPage>
                    <Component {...pageProps} />
                  </MainPage>
                </AuthProvider>
              </ApiProvider>
            </ResponsiveProvider>
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
