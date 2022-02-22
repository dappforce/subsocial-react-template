import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { CardEditType } from "../../../models/common/card-edit";

const SpaceNewPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const onCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <CardEdit
        title={t('forms.titles.newSpace')}
        cancelButton={t('buttons.cancel')}
        saveButton={t('buttons.save')}
        onCancel={onCancel}
        type={CardEditType.Space}
      />
    </Layout>
  );
};

export default SpaceNewPage;
