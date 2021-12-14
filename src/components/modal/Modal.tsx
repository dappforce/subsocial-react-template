import MaterialModal from '@mui/material/Modal'
import { FC } from 'react'
import styles from './Modal.module.sass'
import { Box } from '@mui/system'
import ButtonClose from '../common/button/button-close/ButtonClose'
import { ModalProps } from 'src/models/modal'

const Modal: FC<ModalProps> = ({ open, onClose, className: inputClassName, children, ...props }) => {
    const className = inputClassName ? `${inputClassName} ${styles.modal}` : styles.modal

    return (
        <MaterialModal
            open={open}
            onClose={onClose}
            className={className}
            {...props}
        >
            <Box className={styles.box}>
                <ButtonClose onClick={onClose} className={styles.close}/>
                {children}
            </Box>
        </MaterialModal>
    )
}

export default Modal
