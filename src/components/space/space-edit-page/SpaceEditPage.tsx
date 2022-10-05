import Layout from '../../layout/Layout';
import CardEdit from '../../common/card-edit/CardEdit';
import { useRouter } from 'next/router';
import { useSelectSpace } from 'src/store/features/spaces/spacesHooks';
import { useEffect, useState } from 'react';
import { useApi } from '../../api';
import { fetchSpace } from 'src/store/features/spaces/spacesSlice';
import { useAppDispatch } from 'src/store/app/store';
import { SpaceWithSomeDetails } from '@subsocial/api/types/dto';
import { CardEditType } from "../../../models/common/card-edit";
import { useTranslation } from 'react-i18next';

const SpaceEditPage = () => {
  const router = useRouter();
  const idOrHandle = router.query.spaceId as string;
  const { api } = useApi();
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    (async () => await dispatch(fetchSpace({ api, id })))();

    if (idOrHandle.includes('@')) {
      const handle = idOrHandle.slice(1).toLowerCase();
      api.findDomain(handle).then((domain) => {
        if (domain) setId(domain.innerSpace?.toString() || idOrHandle);
      });
    } else {
      setId(idOrHandle);
    }
  }, [id]);

  const spaceData = useSelectSpace(id) as SpaceWithSomeDetails;

  const onCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <CardEdit
        spaceData={spaceData}
        title={t('forms.titles.editSpace')}
        cancelButton={t('buttons.cancel')}
        saveButton={t('buttons.save')}
        onCancel={onCancel}
        type={CardEditType.Space}
      />
    </Layout>
  );
};

export default SpaceEditPage;
