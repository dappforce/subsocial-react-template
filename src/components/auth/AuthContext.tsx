import { createContext, FC, useEffect, useState } from 'react'
import { asAccountId } from '@subsocial/api'
import { fetchProfiles } from '../../rtk/features/profiles/profilesSlice'
import { setAccounts } from '../../rtk/features/myAccount/myAccountSlice'
import { ACCOUNT_STATUS } from '../../models/auth'
import { useModal } from '../../hooks/useModal'
import { useApi } from '../api'
import { useAppDispatch, useAppSelector } from '../../rtk/app/store'
import ModalSignIn from '../modal/modal-sign-in/ModalSignIn'

type ContextType = {openSingInModal: () => void}

export const AuthContext = createContext<ContextType>({
    openSingInModal: () => {}
})

export const AuthProvider: FC = (props) => {
    const [ status, setStatus ] = useState(ACCOUNT_STATUS.INIT)
    const {isVisible, toggleModal} = useModal()
    const {api} = useApi()
    const {address, accounts} = useAppSelector(state => state.myAccount)
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const {isWeb3Injected, web3Enable, web3Accounts} = await import('@polkadot/extension-dapp')

            if (!isWeb3Injected) {
                setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND)
            }

            if (isWeb3Injected) {
                const injectedExtensions = await web3Enable('Subsocial')
                const polkadotJs = injectedExtensions.find(extension => extension.name === 'polkadot-js')

                if (!polkadotJs) {
                    setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND)
                    return
                }

                unsub = polkadotJs.accounts.subscribe(async (accounts) => {
                    if (!accounts.length) {
                        return setStatus(ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND)
                    }

                    const addresses = accounts.map(account => {
                        return {
                            address: asAccountId(account.address)?.toString() as string,
                            name: account.name as string
                        }
                    })
                    await dispatch(fetchProfiles({api, ids: addresses.map(address => address.address), reload: true}))
                    dispatch(setAccounts(addresses))
                })

                if (!address) {
                    setStatus(ACCOUNT_STATUS.UNAUTHORIZED)
                    return
                }
            }

        })()

        let unsub: (() => void) | undefined

        return () => {
            unsub && unsub()
        }
    }, [])

    useEffect(() => {
        if (accounts?.length) {
            setStatus(ACCOUNT_STATUS.UNAUTHORIZED)
        }
    }, [accounts])

    return <AuthContext.Provider value={{openSingInModal: toggleModal}}>
        <ModalSignIn onClose={toggleModal} open={isVisible} status={status}/>
        {props.children}
    </AuthContext.Provider>
}
