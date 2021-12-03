import styles from './ModalSignIn.module.sass'
import { TitleSizes } from 'src/models/common/typography'
import { ModalSignInProps } from 'src/models/modal'
import { Box } from '@mui/system'
import Modal from '../Modal'
import { FC } from 'react'
import Title from '../../common/title/Title'
import NoExtension from './NoExtension'
import NoAccount from './NoAccount'
import Accounts from './Accounts'
import { useAppSelector } from 'src/rtk/app/store'
import { ACCOUNT_STATUS } from 'src/models/auth'

const ModalSignIn: FC<ModalSignInProps> = ({status, onClose, open}) => {
    const {address, accounts} = useAppSelector(state => state.myAccount)

    const getModal = () => {
        switch (status) {
            case ACCOUNT_STATUS.EXTENSION_NOT_FOUND:
                return <NoExtension/>
            case ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND:
                return  <NoAccount/>
            case ACCOUNT_STATUS.UNAUTHORIZED:
                return <Accounts accounts={accounts || []} onClose={onClose}/>
            default:
                return <NoExtension/>
        }
    }

    return (
        <Modal className={styles.modal} onClose={onClose} open={open && !address}>
            <Box sx={{m: 2, display: 'flex', flexDirection: 'column', rowGap: 2, textAlign: 'center'}}>
                <Title type={TitleSizes.DETAILS} className={styles.title}>Sign in</Title>
                {getModal()}
            </Box>
        </Modal>
    )
}

export default ModalSignIn
