import { FC, useState } from 'react'
import styles from './ProfileFollowers.module.sass'
import { useModal } from 'src/hooks/useModal'
import { pluralize } from '@subsocial/utils'
import Modal from '../../modal/Modal'
import ModalConnections from '../../modal/modal-reactions/ModalConnections'
import { transformCount } from 'src/utils'
import { ProfileFollowersProps } from 'src/models/common/profile-followers'

const ProfileFollowers: FC<ProfileFollowersProps> = (
    {
        className: inputClassName,
        followers,
        following,
        accountId
    }
) => {
    const className = inputClassName ? `${inputClassName} ${styles.follow}` : styles.follow
    const {isVisible, toggleModal} = useModal()
    const [activeTab, setActiveTab] = useState<'following' | 'followers'>('following')
    const [followerCount, followerLabel] = pluralize(
        followers, 'Follower', 'Followers'
    ).split(' ')

    const openModalWithTab = (tab: 'following' | 'followers') => {
        toggleModal()
        setActiveTab(tab)
    }

    return (
        <div className={className}>
            <Modal open={isVisible} onClose={toggleModal}>
                <ModalConnections
                    activeTab={activeTab}
                    countFollowing={following}
                    countFollowers={followers}
                    accountId={accountId}
                    onClose={toggleModal}
                />
            </Modal>
            <button onClick={() => openModalWithTab('following')}>
                <span className={styles.bold}>{transformCount(following)}</span> Following
            </button>
            <button onClick={() => openModalWithTab('followers')}>
                <span className={styles.bold}>{transformCount(+followerCount)}</span> {followerLabel}
            </button>
        </div>
    )
}

export default ProfileFollowers
