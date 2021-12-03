import React, { FC } from 'react'
import { ApiProvider } from '../api'

const ClientLayout: FC = ({children}) => {
    return <ApiProvider>
            {children}
        </ApiProvider>
}

export default ClientLayout
