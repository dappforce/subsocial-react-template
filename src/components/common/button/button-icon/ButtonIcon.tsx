import { FC } from 'react'
import styles from './ButtonIcon.module.sass'
import { ButtonProps } from '@mui/material/Button/Button'
import Button from '@mui/material/Button'

const ButtonIcon: FC<ButtonProps> = (props) => {
    const className = props.className ? `${styles.button} ${props.className}` : styles.button

    return (
        <Button
            variant={'text'}
            onClick={props.onClick}
            className={className}
        >
            {props.children}
        </Button>
    )
}

export default ButtonIcon
