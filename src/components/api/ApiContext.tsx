import { createContext, FC, useContext, useEffect, useState } from 'react'
import { newFlatSubsocialApi } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import useLoader from '../../hooks/useLoader'
import Snackbar from '../common/snackbar/Snackbar'
import { HttpRequestMethod } from '@subsocial/api/types'
import store from 'store'
import { MY_ADDRESS, setMyAddress } from '../../rtk/features/myAccount/myAccountSlice'
import { useAppDispatch } from '../../rtk/app/store'

type ContextType = {api: FlatSubsocialApi}
export const ApiContext = createContext<ContextType>({api: {} as FlatSubsocialApi})

const config = {
    substrateNodeUrl: 'wss://rpc.subsocial.network',
    offchainUrl: 'https://app.subsocial.network/offchain',
    ipfsNodeUrl: 'https://staging.subsocial.network/ipfs-1',
    useServer: {
        httpRequestMethod: 'get' as HttpRequestMethod
    }
}

export async function initSubsocialApi() {
    return await newFlatSubsocialApi(config)
}

export const ApiProvider: FC = (props) => {
    const [ api, setApi ] = useState<FlatSubsocialApi>({} as FlatSubsocialApi)
    const {isLoader, toggleLoader} = useLoader()
    const dispatch = useAppDispatch()

    useEffect( () => {
        if (store.get(MY_ADDRESS)) {
            dispatch(setMyAddress(store.get(MY_ADDRESS)))
        }

        toggleLoader()
        initSubsocialApi().then(res => {
            setApi(res)
            toggleLoader()
        })
    }, [])

    return !api.subsocial
        ? <Snackbar
            open={isLoader}
            message={'Connecting to the network...'}
            onClose={toggleLoader}
        /> : (
            <ApiContext.Provider value={{api}}>
                {props.children}
            </ApiContext.Provider>
        )
}

export function useApi () {
    return useContext(ApiContext)
}
