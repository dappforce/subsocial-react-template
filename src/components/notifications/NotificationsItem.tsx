import styles from './NotificationsPage.module.sass';
import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import AvatarElement from '../common/avatar/AvatarElement';
import { AvatarSizes } from '../../models/common/avatar';
import { FC } from 'react';
import Image from '../common/image/Image';
import { NotificationsItemProps } from '../../models/notifications';
import { DateService, getUrl, loadImgUrl, TypeUrl } from 'src/utils';
import Title from '../common/title/Title';
import { TitleSizes } from '../../models/common/typography';
import Link from '../common/links/link/Link';
import SmallLink from '../common/links/small-link/SmallLink';
import { useTranslation } from 'react-i18next';

type NotificationMessageProps = {
  msg: string;
  aggregationCount: number;
  withAggregation: boolean;
};

const NotificationMessage = ({
  msg,
  aggregationCount,
  withAggregation = true,
}: NotificationMessageProps) => {
  const { t } = useTranslation();
  const aggregationMsg = withAggregation
    ? aggregationCount > 0 && (
        <> {t('notifications.aggregate', { count: aggregationCount })}</>
      )
    : undefined;

  return (
    <>
      {aggregationMsg} {msg}&nbsp;
    </>
  );
};

const NotificationsMessage: FC<NotificationsItemProps> = ({
  ownerName,
  ownerId,
  subject,
  msg,
  aggregationCount,
  msgType,
  subjectLink,
}) => (
  <Typography className={styles.message}>
    <Link
      href={getUrl({
        type: TypeUrl.Account,
        id: ownerId,
      })}
    >
      <Title type={TitleSizes.PROFILE} className={styles.title}>
        {ownerName}
      </Title>
    </Link>
    <NotificationMessage
      msg={msg}
      aggregationCount={aggregationCount}
      withAggregation={msgType === 'notifications'}
    />
    <Link href={subjectLink}>
      <span className={styles.bold}>{subject}</span>
    </Link>
  </Typography>
);

const NotificationsItem: FC<NotificationsItemProps> = (props) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Link
            href={getUrl({
              type: TypeUrl.Account,
              id: props.ownerId,
            })}
            image
          >
            <AvatarElement
              src={props.ownerImage}
              size={AvatarSizes.MEDIUM}
              id={props.ownerId}
            />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={<NotificationsMessage {...props} />}
          secondary={
            <SmallLink href={props.subjectLink}>
              {DateService.getDate(props.date)}
            </SmallLink>
          }
        />
        {props.image && (
          <Link href={props.subjectLink} image className={styles.link}>
            <Image
              src={loadImgUrl(props.image)}
              width={46}
              height={46}
              alt={''}
              className={styles.image}
            />
          </Link>
        )}
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

export default NotificationsItem;
