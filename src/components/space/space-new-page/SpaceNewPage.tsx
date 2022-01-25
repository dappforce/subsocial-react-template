import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';

const SpaceNewPage = () => {
  const router = useRouter();
  const onCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <CardEdit
        title={'New Space'}
        cancelButton={'Cancel'}
        saveButton={'Save'}
        onCancel={onCancel}
      />
    </Layout>
  );
};

export default SpaceNewPage;
