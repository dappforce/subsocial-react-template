import { FC } from 'react';
import { ButtonFollowSpaceProps } from 'src/models/common/button';
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store';
import { useApi } from 'src/components/api';
import { notDef } from '@subsocial/utils';
import TxButton from '../TxButton';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { SpaceId } from '@subsocial/api/flat-subsocial/dto';
import { selectSpaceIdsByFollower } from 'src/rtk/features/spaceIds/followedSpaceIdsSlice';
import { shallowEqual } from 'react-redux';
import { useCreateReloadSpace } from 'src/rtk/app/hooks';
import { reloadSpaceIdsFollowedByAccount } from 'src/components/space/reloadSpaceIdsFollowedByAccount';
import { MenuItem } from '@mui/material';
import labelForMenuItem from 'src/components/utils/labelForMenuItem';
import { useTranslation } from 'react-i18next';

export const useAmISpaceFollower = (spaceId: SpaceId = '0') => {
  const myAddress = useMyAddress();

  const followedSpaceIds =
    useAppSelector((state) => {
      return myAddress ? selectSpaceIdsByFollower(state, myAddress) : [];
    }, shallowEqual) || [];

  return followedSpaceIds.indexOf(spaceId) >= 0;
};

const ButtonFollowSpace: FC<ButtonFollowSpaceProps> = ({ space, ...props }) => {
  const myAddress = useMyAddress();

  const spaceId = space.id;
  const buildTxParams = () => [spaceId];

  const dispatch = useAppDispatch();
  const { api } = useApi();
  const isFollower = useAmISpaceFollower(spaceId);
  const { t } = useTranslation();

  const variant = isFollower ? 'outlined' : 'contained';
  let label: string | React.ReactNode;

  if (props.component === MenuItem) {
    label = labelForMenuItem(
      isFollower ? t('buttons.following') : t('buttons.follow'),
      'following',
      22,
      16
    );
  } else {
    label = isFollower ? t('buttons.following') : t('buttons.follow');
  }
  const reloadSpace = useCreateReloadSpace();
  const loading = notDef(isFollower);

  const onTxSuccess = () => {
    if (myAddress) {
      reloadSpaceIdsFollowedByAccount({
        substrate: api.subsocial.substrate,
        dispatch,
        account: myAddress,
      });
      reloadSpace({ id: spaceId });
    }
  };

  return (
    <TxButton
      accountId={myAddress}
      variant={variant}
      tx={
        isFollower ? 'spaceFollows.unfollowSpace' : 'spaceFollows.followSpace'
      }
      onSuccess={onTxSuccess}
      params={buildTxParams}
      loading={props.component === MenuItem ? undefined : loading}
      label={label}
      withLoader
      {...props}
    />
  );
};

export default ButtonFollowSpace;
