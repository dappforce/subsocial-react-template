import React from 'react'
import Text from '../../common/text/Text'
import { TextSizes } from '../../../models/common/typography'
import Link from '../../common/links/link/Link'
import styles from './ModalSignIn.module.sass'
import ButtonCancel from '../../common/button/button-cancel/ButtonCancel'
import Icon from '../../common/icons/Icon'
import { firefox, google } from '../../../assets'

const NoExtension = () => {
    return (
        <>
            <Text type={TextSizes.NORMAL}>
                <Link
                    href={'https://github.com/polkadot-js/extension'}
                    ext
                    className={styles.link}
                >
                    Polkadot Extension
                </Link> was not found or disabled.
                Install the extension with the button below.
            </Text>

            <a
                href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
                target={'_blank'}
                rel="noreferrer"
            >
                <ButtonCancel className={styles.button}>
                    <Icon src={google} width={20} height={20}/>
                    Install for Chrome
                </ButtonCancel>
            </a>

            <a
                href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/"
                target={'_blank'}
                rel="noreferrer"
            >
                <ButtonCancel className={`${styles.button} ${styles.firefox}`}>
                    <Icon src={firefox} width={20} height={20}/>
                    Install for Firefox
                </ButtonCancel>
            </a>

            <Text type={TextSizes.SECONDARY} className={styles.hint}>
                Need help? Read our <Link
                href={'https://app.subsocial.network/docs/sign-up'}
                ext
                className={styles.link}
            >Sign In Guide</Link>
            </Text>
        </>
    )
}

export default NoExtension
