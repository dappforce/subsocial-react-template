import React, { FC, useEffect } from 'react'
import { Alert, Snackbar as SnackbarComponent } from '@mui/material'
import styles from './Snackbar.module.sass'
import { SnackbarProps } from 'src/models/common/snackbar'

const Snackbar: FC<SnackbarProps> = ({open, onClose, message}) => {
    useEffect(() => () => onClose(), [])

    return (
        <SnackbarComponent
            className={styles.snackbar}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity="info" sx={{ width: '100%' }} className={styles.alert}>
                {message}
            </Alert>
        </SnackbarComponent>
    )
}

export default Snackbar
