import { FC } from 'react'
import styles from './Title.module.sass'
import { TitleProps } from '../../../models/common/typography'
import { Typography } from '@mui/material'

const Title: FC<TitleProps> = ({ type, variant = 'body1', children, className: inputClassName, ...props }) => {
  const className = inputClassName ? `${styles.title} ${styles[type]} ${inputClassName}` : `${styles.title} ${styles[type]}`

  return <Typography variant={variant} className={className} {...props}>{children}</Typography>
}

export default Title
