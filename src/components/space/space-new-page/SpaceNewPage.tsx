import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const SpaceNewPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const onCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <CardEdit
        title={'New Space'}
        cancelButton={t('buttons.cancel')}
        saveButton={t('buttons.save')}
        onCancel={onCancel}
      />
    </Layout>
  );
};

export default SpaceNewPage;
