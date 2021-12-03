import styles from './HiddenComponent.module.sass'
import ButtonComponent from '../button/button-component/ButtonComponent'
import ErrorIcon from '@mui/icons-material/Error'
import { Alert } from '@mui/material'

const HiddenComponent = () => (
    <Alert
        className={styles.warning}
        severity={'warning'}
        action={
            <ButtonComponent variant={'outlined'} className={styles.button}>
                Make visible
            </ButtonComponent>
        }
        icon={<ErrorIcon/>}
    >
        This post is unlisted and only you can see it
    </Alert>
)

export default HiddenComponent
