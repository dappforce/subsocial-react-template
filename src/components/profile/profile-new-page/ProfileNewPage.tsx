import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { CardEditType } from "../../../models/common/card-edit";
import { useTranslation } from 'react-i18next';

const ProfileNewPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <CardEdit
        title={t('forms.titles.newProfile')}
        saveButton={t('buttons.save')}
        cancelButton={t('buttons.cancel')}
        type={CardEditType.Profile}
      />
    </Layout>
  );
};

export default ProfileNewPage;
