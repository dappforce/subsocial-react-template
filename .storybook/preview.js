import '../src/styles/common.sass';
import '../src/styles/github-markdown.sass';
import 'easymde/dist/easymde.min.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/stylesheets/theme';
import * as NextImage from 'next/image';
import { Provider } from 'react-redux';
import { initializeStore } from '../src/store/app/store';
import { StyledEngineProvider } from '@mui/material/styles';
import i18n from '../src/i18n';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { MockedData } from '../stories/mocked-data/MockedData';

const store = initializeStore();

export const decorators = [
  (Story) => {
    return (
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MockedData>
              {Story()}
            </MockedData>
          </ThemeProvider>
        </Provider>
      </StyledEngineProvider>
    );
  },
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    return (
      <OriginalNextImage
        {...props}
        unoptimized
        blurDataURL="data:image/jpeg/svg"
      />
    );
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  i18n,
};
