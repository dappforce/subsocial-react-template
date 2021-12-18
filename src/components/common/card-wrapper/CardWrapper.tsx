import { FC } from 'react'
import { CardProps } from '@mui/material/Card/Card'
import { Card } from '@mui/material'
import styles from './CardWrapper.module.sass'

const CardWrapper: FC<CardProps> = ({children, className: inputClassName, ...props}) => {
    const className = inputClassName ? `${inputClassName} ${styles.card}` : styles.card

    return <Card className={className} {...props}>{children}</Card>
}

export default CardWrapper
