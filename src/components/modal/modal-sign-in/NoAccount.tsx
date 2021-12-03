import React from 'react'
import { Alert } from '@mui/material'
import Link from '../../common/links/link/Link'
import styles from './ModalSignIn.module.sass'
import ModalSignInInfo from './ModalSignInInfo'

const NoAccount = () => {
    return (
        <>
            <Alert severity="warning" icon={false}>
                No accounts found. Please open your <Link
                href={'https://github.com/polkadot-js/extension'}
                ext
                className={`${styles.link} ${styles.black}`}
            >
                Polkadot Extension
            </Link> and create a new account or
                import existing. Then reload this page.
            </Alert>

            <ModalSignInInfo/>
        </>
    )
}

export default NoAccount
