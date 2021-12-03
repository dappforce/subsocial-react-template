import { FC, useState } from 'react'
import { AccountFollowersProps } from '../../models/account'
import styles from './SwitchAccount.module.sass'
import { useModal } from '../../hooks/useModal'
import Modal from '../modal/Modal'
import ModalConnections from '../modal/modal-reactions/ModalConnections'
import { transformCount } from '../../utils'

const AccountFollowers: FC<AccountFollowersProps> = (
    {
        className,
        followers = 0,
        following= 0,
        accountId
    }
) => {
    const classname = className ? `${className} ${styles.follow}` : styles.follow
    const {isVisible, toggleModal} = useModal()
    const [ activeTab, setActiveTab ] = useState<'following' | 'followers'>('following')

    const openModalWithTab = (tab: 'following' | 'followers') => {
        toggleModal()
        setActiveTab(tab)
    }

    return (
        <div className={classname}>
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
                <span className={styles.bold}>{transformCount(followers)}</span> Followers
            </button>
        </div>
    )
}

export default AccountFollowers
