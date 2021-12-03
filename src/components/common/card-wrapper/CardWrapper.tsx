import { FC } from 'react'
import { CardProps } from '@mui/material/Card/Card'
import { Card } from '@mui/material'

const CardWrapper: FC<CardProps> = ({children, ...props}) => {
  return <Card sx={{maxWidth: 765, width: '100%'}} {...props}>{children}</Card>
}

export default CardWrapper
