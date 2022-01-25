import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';

const ProfileNewPage = () => {
  return (
    <Layout>
      <CardEdit
        title={'New Profile'}
        saveButton={'Save'}
        cancelButton={'Cancel'}
      />
    </Layout>
  );
};

export default ProfileNewPage;
