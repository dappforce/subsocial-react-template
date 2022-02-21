import React, { FC } from 'react';
import styles from './ButtonNotificatoin.module.sass';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useRouter } from 'next/router';
import { Badge } from '@mui/material';
import { ButtonNotificationProps } from 'src/models/common/button';


const ButtonNotification: FC<ButtonNotificationProps> = ({ value = 0 }) => {
  const router = useRouter();

  return (
    <Badge
      badgeContent={value}
      onClick={() => router.push('/notifications')}
      className={styles.button}
    >
      <NotificationsNoneIcon />
    </Badge>
  );
};

export default ButtonNotification;
