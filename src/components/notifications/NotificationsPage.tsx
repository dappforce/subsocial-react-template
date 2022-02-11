import Layout from '../layout/Layout';
import { List } from '@mui/material';
import styles from './NotificationsPage.module.sass';
import Title from '../common/title/Title';
import { NextPage } from 'next';
import { Box } from '@mui/system';
import { TitleSizes } from '../../models/common/typography';
import { useTranslation } from 'react-i18next';

type NotificationPageProps = {
  children: React.ReactNode;
};

const NotificationsPage: NextPage = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box className={styles.box}>
        <List
          subheader={
            <Title className={styles.subheader} type={TitleSizes.DETAILS}>
              {t('notifications.title')}
            </Title>
          }
        >
          {children}
        </List>
      </Box>
    </Layout>
  );
};

export default NotificationsPage;
