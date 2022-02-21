import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import Layout from '../layout/Layout';
import { Notifications } from './Notifications';

const NOTIFICATION_TITLE = 'My notifications';

export const MyNotifications = () => {
  const myAddress = useMyAddress();

  if (!myAddress) return <>Non Authorized</>;

  return (
    <Layout>
      <Notifications title={NOTIFICATION_TITLE} address={myAddress} />
    </Layout>
  );
};

export default MyNotifications;
