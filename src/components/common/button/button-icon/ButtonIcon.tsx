import { FC } from 'react'
import styles from './ButtonIcon.module.sass'
import { ButtonProps } from '@mui/material/Button/Button'
import Button from '@mui/material/Button'

const ButtonIcon: FC<ButtonProps> = (props) => {
    const classname = props.className ? `${styles.button} ${props.className}` : styles.button

    return (
        <Button variant={'text'} onClick={props.onClick} className={classname}>
            {props.children}
        </Button>
    )
}

export default ButtonIcon
