import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/rtk/app/store';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';

const ProfileEditPage = () => {
  const router = useRouter();

  const { address } = useAppSelector((state) => state.myAccount);
  const profileData = useSelectProfile(address);

  const onCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <CardEdit
        profileData={profileData}
        title={'Edit Profile'}
        cancelButton={'Cancel'}
        saveButton={'Save'}
        onCancel={onCancel}
      />
    </Layout>
  );
};

export default ProfileEditPage;
