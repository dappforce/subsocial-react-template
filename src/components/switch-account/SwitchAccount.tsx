import Drawer from '@mui/material/Drawer'
import ButtonClose from '../common/button/button-close/ButtonClose'
import styles from './SwitchAccount.module.sass'
import Modal from '../modal/Modal'
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store'
import { toggleAccount } from 'src/rtk/features/mainSlice'
import SwitchAccountContent from './SwitchAccountContent'
import { useResponsiveSize } from '../responsive/ResponsiveContext'
export const SwitchAccount = () => {
    const {isOpenAccount} = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const {isMobile} = useResponsiveSize()

    return !isMobile
        ? <Drawer anchor={'right'} open={isOpenAccount} onClose={() => dispatch(toggleAccount())} className={styles.drawer}>
            <ButtonClose onClick={() => dispatch(toggleAccount())} className={styles.close}/>
            <SwitchAccountContent onClose={() => dispatch(toggleAccount())}/>
        </Drawer>
        : <Modal open={isOpenAccount} onClose={() => dispatch(toggleAccount())} className={styles.drawer}>
            <SwitchAccountContent onClose={() => dispatch(toggleAccount())}/>
        </Modal>
}
