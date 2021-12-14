import { FC } from 'react'
import styles from './Tag.module.sass'
import { Chip, ChipProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Tag: FC<ChipProps> = ({ label, className: inputClassName, ...props }) => {
    const className = inputClassName ? `${inputClassName} ${styles.tag}` : styles.tag

    return (
        <Chip
            label={label}
            className={className}
            {...props}
            deleteIcon={<CloseIcon/>}
        />
    )
}

export default Tag
