import styles from './NotificationsPage.module.sass'
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import AvatarElement from '../common/avatar/AvatarElement'
import { AvatarSizes } from '../../models/common/avatar'
import { FC } from 'react'
import Image from 'next/image'
import { NotificationsItemProps } from '../../models/notifications'
import { myLoader } from 'src/utils'
import Title from '../common/title/Title'
import { TitleSizes } from '../../models/common/typography'
import Link from '../common/links/link/Link'
import SmallLink from '../common/links/small-link/SmallLink'

const NotificationsMessage: FC<NotificationsItemProps> = ({ownerName,ownerId, subject, action}) => (
     <Typography className={styles.message}>
         <Link href={`/accounts/${ownerId}`}><Title type={TitleSizes.PROFILE} className={styles.title}>{ownerName}</Title></Link>{' '}
         {action} <Link href={'/'}><span className={styles.bold}>{subject}</span></Link>
    </Typography>
)

const NotificationsItem: FC<NotificationsItemProps> = (props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Link href={`/accounts/${props.ownerId}`} image>
                    <AvatarElement src={props.ownerImg} size={AvatarSizes.SMALL} id={props.id}/>
                </Link>
            </ListItemAvatar>
            <ListItemText
                primary={<NotificationsMessage {...props} />}
                secondary={<SmallLink href={'/'}>{props.date}</SmallLink>}
            />
            {props.image && <Link href={'/'} image><Image src={props.image} width={46} height={46} alt={""} loader={myLoader}/></Link>}
        </ListItem>
    )
}

export default NotificationsItem
