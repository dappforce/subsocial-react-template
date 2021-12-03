import MaterialModal from '@mui/material/Modal'
import { FC } from 'react'
import styles from './Modal.module.sass'
import { Box } from '@mui/system'
import ButtonClose from '../common/button/button-close/ButtonClose'
import { ModalProps } from 'src/models/modal'

const Modal: FC<ModalProps> = ({open, onClose, className, children, ...props}) => {
    const classname = className ? `${className} ${styles.modal}` : styles.modal

    return (
        <MaterialModal
            open={open}
            onClose={onClose}
            className={classname}
            {...props}
        >
            <Box sx={{maxWidth: 500, width: '100%', position: 'relative', m: 2, borderRadius: 0.5, overflow: 'hidden'}}>
                <ButtonClose onClick={onClose} className={styles.close}/>
                {children}
            </Box>
        </MaterialModal>
    )
}

export default Modal
