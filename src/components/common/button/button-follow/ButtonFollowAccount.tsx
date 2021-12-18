import { FC } from 'react'
import { ButtonFollowAccountProps } from 'src/models/common/button'
import { useAppSelector } from 'src/rtk/app/store'
import TxButton from '../TxButton'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'
import { SpaceId } from '@subsocial/api/flat-subsocial/dto'
import { selectSpaceIdsByFollower } from 'src/rtk/features/spaceIds/followedSpaceIdsSlice'
import { shallowEqual } from 'react-redux'
import { useCreateReloadAccountIdsByFollower, useCreateReloadProfile } from 'src/rtk/app/hooks'
import styles from './ButtonFollow.module.sass'
import { selectAccountIdsByFollower } from 'src/rtk/features/profiles/followedAccountIdsSlice'
import { useIsMyAddress } from 'src/hooks/useIsMySpace'

export const useAmISpaceFollower = (spaceId: SpaceId = '0') => {
    const myAddress = useMyAddress()

    const followedSpaceIds = useAppSelector(state => {
        return myAddress
            ? selectSpaceIdsByFollower(state, myAddress)
            : []
    }, shallowEqual) || []


    return followedSpaceIds.indexOf(spaceId) >= 0
}

const ButtonFollowSpace: FC<ButtonFollowAccountProps> = ({address, ...props}) => {
    const myAddress = useMyAddress()
    const followedAccountIds = useAppSelector(state => myAddress ? selectAccountIdsByFollower(state, myAddress) : [], shallowEqual) || []
    const reloadAccountIdsByFollower = useCreateReloadAccountIdsByFollower()
    const isMyAddress = useIsMyAddress(address)
    const isFollower = followedAccountIds.indexOf(address.toString()) >= 0
    const reloadProfile = useCreateReloadProfile()

    if (myAddress && isMyAddress) return null

    const variant = isFollower ? 'outlined' : 'contained'
    const label = isFollower ? 'Unfollow' : 'Follow'

    const buildTxParams = () => [ address ]

    const onTxSuccess = () => {
        if (myAddress) {
            reloadAccountIdsByFollower(myAddress)
            reloadProfile({ id: myAddress  })
            reloadProfile({ id: address })
        }
    }

    return (
        <TxButton
            accountId={myAddress}
            variant={variant}
            tx={isFollower
                ? 'profileFollows.unfollowAccount'
                : 'profileFollows.followAccount'}
            onSuccess={onTxSuccess}
            params={buildTxParams}
            label={label}
            className={styles.disabled}
            {...props}
            withLoader
        />
    )
}

export default ButtonFollowSpace
