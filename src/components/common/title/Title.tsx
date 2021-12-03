import { FC } from 'react'
import styles from './Title.module.sass'
import { TitleProps } from '../../../models/common/typography'
import { Typography } from '@mui/material'

const Title: FC<TitleProps> = ({type, variant = 'body1', children, className, ...props}) => {
  const classname = className ? `${styles.title} ${styles[type]} ${className}` : `${styles.title} ${styles[type]}`

  return <Typography variant={variant} className={classname} {...props}>{children}</Typography>
}

export default Title
