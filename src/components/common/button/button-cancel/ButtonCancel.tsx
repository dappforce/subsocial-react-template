import { FC } from 'react'
import styles from './ButtonCancel.module.sass'
import ButtonComponent from '../button-component/ButtonComponent'
import { ButtonCancelProps } from 'src/models/common/button'

const ButtonCancel: FC<ButtonCancelProps> = (props) => {
    const classname = props.className ? `${styles.button} ${props.className}` : styles.button

    return (
        <ButtonComponent variant={'outlined'} onClick={props.onClick} className={classname}>
            {props.children}
        </ButtonComponent>
    )
}

export default ButtonCancel
