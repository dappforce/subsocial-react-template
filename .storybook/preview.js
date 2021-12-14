import '../src/styles/common.sass'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../src/stylesheets/theme'
import * as NextImage from 'next/image'
import { ApiProvider } from '../src/components/api'
import { Provider } from 'react-redux'
import { initializeStore } from '../src/rtk/app/store'
import { StyledEngineProvider } from '@mui/material/styles'

const store = initializeStore()

export const decorators = [
    (Story) => {
        return (
            <StyledEngineProvider injectFirst>
                <Provider store={ store }>
                    <ApiProvider>
                        <ThemeProvider theme={ theme }>
                            { Story() }
                        </ThemeProvider>
                    </ApiProvider>
                </Provider>
            </StyledEngineProvider>
        )
    },
]

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => {
        return (
            <OriginalNextImage
                { ...props }
                unoptimized
                blurDataURL="data:image/jpeg/svg"
            />
        )
    }
})

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    }
}
