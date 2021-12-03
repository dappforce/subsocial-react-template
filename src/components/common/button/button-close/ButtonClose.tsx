import styles from '../../../modal/Modal.module.sass'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { FC } from 'react'
import { IconButtonProps } from '@mui/material/IconButton/IconButton'

const ButtonClose: FC<IconButtonProps> = ({onClick, ...props}) => {
  return <IconButton className={styles.close} onClick={onClick} {...props}>
      <CloseIcon/>
  </IconButton>
}

export default ButtonClose
