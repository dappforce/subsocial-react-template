import { FC } from 'react'
import styles from './ProfileAccount.module.sass'
import Options from '../../common/button/button-options/ButtonOptions'
import Tabs from '../../common/tabs/Tabs'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import Account from '../../account/Account'
import { ProfileAccountProps } from 'src/models/profile'
import { toShortAddress } from '../../utils/address'
import ButtonFollowAccount from '../../common/button/button-follow/ButtonFollowAccount'

const ProfileAccount: FC<ProfileAccountProps> = (props) => {
    const { content, struct, id } = props
    const tabs = [
        { label: 'Posts', tabValue: 'userPosts' },
        { label: 'Spaces', tabValue: 'userSpaces' }
    ]

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
                <ButtonFollowAccount address={id} className={styles.button} />
            </>}
            action={<Options className={styles.option} />}
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
