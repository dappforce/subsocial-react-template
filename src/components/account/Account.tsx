import { FC } from 'react'
import CardWrapper from '../common/card-wrapper/CardWrapper'
import AvatarElement from '../common/avatar/AvatarElement'
import { AvatarSizes } from '../../models/common/avatar'
import Title from '../common/title/Title'
import { TitleSizes } from '../../models/common/typography'
import styles from './Account.module.sass'
import FollowersBlock from './followers-block/FollowersBlock'
import { CardActions, CardContent, CardHeader, Divider } from '@mui/material'
import IconLink from '../common/links/icon-link/IconLink'
import TagList from '../common/tag/TagList'
import Image from 'next/image'
import { walletIco } from '../../assets'
import { myLoader } from 'src/utils'
import Address from '../common/address/Address'
import Balance from '../common/balance/Balance'
import { AccountProps } from '../../models/account'
import { AccountDescription } from './AccountDescription'
import ProfileFollowers from '../common/profile-followers/ProfileFollowers'

const Account: FC<AccountProps> = (props) => {
    return (
        <CardWrapper>
            <CardHeader
                avatar={<AvatarElement src={props.avatar} size={AvatarSizes.MEDIUM} id={props.id}/>}
                action={props.action}
                title={<Title type={TitleSizes.PREVIEW} className={styles.title}>{props.name}</Title>}
                subheader={props.followingCount === undefined
                    ? <FollowersBlock followers={props.followersCount} posts={props.posts} id={props.id}/>
                    : <ProfileFollowers
                        className={styles.followers}
                        following={props.followingCount}
                        followers={props.followersCount}
                        accountId={props.id}
                    />
                }
            />

            <AccountDescription about={props.about} summary={props.summary} isShowMore={props.isShowMore}/>

            {props.links && props.links?.length > 0 &&
            <CardActions sx={{pl: 2, pr: 2, pb: 2, pt: 0, flexWrap: 'wrap', gap: 1}}>
                {props.links.map(link => <IconLink link={link as string} key={link as string}/>)}
            </CardActions>
            }

            {props.withBalance &&
            <CardContent sx={{pt: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
                <div style={{display: 'flex', gap: '0.25rem'}}>
                    <Image src={walletIco} width={24} height={24} alt={'wallet'} loader={myLoader}/>
                    <Address label={props.id} size={'lg'} isCopy isQr/>
                </div>

                <Balance address={props.id} isIcon className={styles.balance}/>
            </CardContent>}

            {props.tags && <TagList tags={props.tags} className={styles.tags}/>}

            {props.buttons &&
            <CardActions sx={{pl: 2, pr: 2, pb: 2, pt: 0, gap: 1.625}}>
                {props.buttons}
            </CardActions>
            }

            {props.tabs && <><Divider variant="middle"/>{props.tabs}</>}
        </CardWrapper>
    )
}

export default Account
