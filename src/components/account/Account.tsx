import { FC } from 'react';
import CardWrapper from '../common/card-wrapper/CardWrapper';
import AvatarElement from '../common/avatar/AvatarElement';
import { AvatarSizes } from '../../models/common/avatar';
import Title from '../common/title/Title';
import { TitleSizes } from '../../models/common/typography';
import styles from './Account.module.sass';
import FollowersBlock from './followers-block/FollowersBlock';
import { CardActions, CardContent, CardHeader, Divider } from '@mui/material';
import IconLink from '../common/links/icon-link/IconLink';
import TagList from '../common/tag/TagList';
import Image from '../common/image/Image';
import Address from '../common/address/Address';
import Balance from '../common/balance/Balance';
import { AccountProps } from '../../models/account';
import { AccountDescription } from './AccountDescription';
import ProfileFollowers from '../common/profile-followers/ProfileFollowers';

const Account: FC<AccountProps> = (props) => {
  return (
    <CardWrapper>
      <CardHeader
        avatar={
          <AvatarElement
            src={props.avatar}
            size={AvatarSizes.LARGE}
            id={props.id}
          />
        }
        action={props.action}
        title={
          <Title type={TitleSizes.PREVIEW} className={styles.title}>
            {props.name}
          </Title>
        }
        subheader={
          props.followingCount === undefined ? (
            <FollowersBlock
              followers={props.followersCount}
              posts={props.posts}
              id={props.id}
            />
          ) : (
            <ProfileFollowers
              className={styles.followers}
              following={props.followingCount}
              followers={props.followersCount}
              accountId={props.id}
            />
          )
        }
      />

      <AccountDescription
        about={props.about}
        summary={props.summary}
        isShowMore={props.isShowMore}
      />

      {props.links && props.links?.length > 0 && (
        <CardActions className={`${styles.cardAction} ${styles.spaceIcon}`}>
          {props.links.map((link) => (
            <IconLink link={link as string} key={link as string} />
          ))}
        </CardActions>
      )}

      {props.withBalance && (
        <CardContent className={styles.accountBalanceInfo}>
          <div className={styles.accountWallet}>
            <Image src={'/wallet.jpg'} width={24} height={24} alt={'wallet'} />
            <Address label={props.id} size={'lg'} isCopy isQr />
          </div>

          <Balance address={props.id} isIcon className={styles.balance} />
        </CardContent>
      )}

      {props.tags && <TagList tags={props.tags} className={styles.tags} />}

      {props.buttons && (
        <CardActions
          className={`${styles.cardAction} ${styles.accountButtons}`}
        >
          {props.buttons}
        </CardActions>
      )}

      {props.tabs && (
        <>
          <Divider variant="middle" />
          {props.tabs}
        </>
      )}
    </CardWrapper>
  );
};

export default Account;
