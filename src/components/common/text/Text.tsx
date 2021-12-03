import { FC } from 'react'
import styles from './Text.module.sass'
import { TextProps } from '../../../models/common/typography'
import { Typography } from '@mui/material'

const Text: FC<TextProps> = ({type, children, className, ...props}) => {
  const classname = className ? `${styles.text} ${styles[type]} ${className}` : `${styles.text} ${styles[type]}`

  return <Typography className={classname} {...props}>{children}</Typography>
}

export default Text
