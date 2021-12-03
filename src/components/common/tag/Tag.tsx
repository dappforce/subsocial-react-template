import { FC } from 'react'
import styles from './Tag.module.sass'
import { Chip, ChipProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Tag: FC<ChipProps> = ({label, ...props}) => {
    return <Chip label={label} className={styles.tag} {...props} deleteIcon={<CloseIcon/>}/>
}

export default Tag
