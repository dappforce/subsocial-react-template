import { FC } from 'react';
import { ButtonFollowAccountProps } from 'src/models/common/button';
import { useAppSelector } from 'src/rtk/app/store';
import TxButton from '../TxButton';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { shallowEqual } from 'react-redux';
import {
  useCreateReloadAccountIdsByFollower,
  useCreateReloadProfile,
} from 'src/rtk/app/hooks';
import { selectAccountIdsByFollower } from 'src/rtk/features/profiles/followedAccountIdsSlice';
import { useIsMyAddress } from 'src/hooks/useIsMySpace';
import { MenuItem } from '@mui/material';
import labelForMenuItem from 'src/components/utils/labelForMenuItem';

const ButtonFollowAccount: FC<ButtonFollowAccountProps> = ({
  address,
  ...props
}) => {
  const myAddress = useMyAddress();
  const followedAccountIds =
    useAppSelector(
      (state) =>
        myAddress ? selectAccountIdsByFollower(state, myAddress) : [],
      shallowEqual
    ) || [];
  const reloadAccountIdsByFollower = useCreateReloadAccountIdsByFollower();
  const isMyAddress = useIsMyAddress(address);
  const isFollower = followedAccountIds.indexOf(address.toString()) >= 0;
  const reloadProfile = useCreateReloadProfile();

  if (myAddress && isMyAddress) return null;

  const variant = isFollower ? 'outlined' : 'contained';

  let label: string | React.ReactNode;

  if (props.component === MenuItem) {
    label = labelForMenuItem(
      isFollower ? 'Following' : 'Follow',
      'following',
      22,
      16
    );
  } else {
    label = isFollower ? 'Following' : 'Follow';
  }

  const buildTxParams = () => [address];

  const onTxSuccess = () => {
    if (myAddress) {
      reloadAccountIdsByFollower(myAddress);
      reloadProfile({ id: myAddress });
      reloadProfile({ id: address });
    }
  };

  return (
    <TxButton
      accountId={myAddress}
      variant={variant}
      tx={
        isFollower
          ? 'profileFollows.unfollowAccount'
          : 'profileFollows.followAccount'
      }
      onSuccess={onTxSuccess}
      params={buildTxParams}
      label={label}
      withLoader
      {...props}
    />
  );
};

export default ButtonFollowAccount;
