import { FC, useEffect, useState } from 'react'
import styles from './ProfileAccount.module.sass'
import Options from '../../common/button/button-options/ButtonOptions'
import ButtonFollow from '../../common/button/ButtonFollow'
import Tabs from '../../common/tabs/Tabs'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import Account from '../../account/Account'
import { ProfileAccountProps } from 'src/models/profile'
import { toShortAddress } from '../../utils/address'
import { useApi } from '../../api'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'

const ProfileAccount: FC<ProfileAccountProps> = (props) => {
    const {content, struct, id} = props
    const tabs = [
        {label: 'Posts', tabValue: 'userPosts'},
        {label: 'Spaces', tabValue: 'userSpaces'}
    ]
    const address = useMyAddress()
    const {api} = useApi()
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        if (id) {
            (async () => {
                const isFollower = await api.subsocial.substrate.isAccountFollower(address as AnyAccountId, id)
                setIsFollowed(isFollower)
            })()
        }
    }, [])

    if (!struct || !id) return null

    return (
        <Account
            name={content?.name || toShortAddress(id)}
            avatar={content?.avatar}
            id={id as string}
            followersCount={struct.followersCount}
            followingCount={struct.followingAccountsCount}
            buttons={<>
                <ButtonComponent variant={'outlined'} className={styles.button}>
                    Send tips
                </ButtonComponent>
                <ButtonFollow isFollowing={isFollowed} className={styles.button}/>
            </>}
            action={<Options sx={{ml: 1}}/>}
            about={content?.about}
            summary={content?.summary}
            //@ts-ignore
            links={content?.links}
            isShowMore={content?.isShowMore}
            tabs={
                <Tabs
                    className={styles.tabs}
                    tabs={tabs}
                    value={props.activeTab}
                    setValue={props.changeTab}
                />
            }
            withBalance
        />
    )
}

export default ProfileAccount
