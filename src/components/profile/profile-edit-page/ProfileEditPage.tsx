import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/store/app/store';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { CardEditType } from "../../../models/common/card-edit";
import { useTranslation } from 'react-i18next';
import styles from './ProfileEditPage.module.sass';

const ProfileEditPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { address } = useAppSelector((state) => state.myAccount);
  const profileData = useSelectProfile(address);

  const onCancel = () => {
    router.back();
  };

  return (
    <Layout className={styles.wrapper}>
      <CardEdit
        profileData={profileData}
        title={t('forms.titles.editProfile')}
        cancelButton={t('buttons.cancel')}
        saveButton={t('buttons.save')}
        onCancel={onCancel}
        type={CardEditType.Profile}
      />
    </Layout>
  );
};

export default ProfileEditPage;
