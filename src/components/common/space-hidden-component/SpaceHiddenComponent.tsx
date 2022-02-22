import styles from './SpaceHiddenComponent.module.sass';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { TypeContent } from 'src/models/common/button';
import { useSelectSpace } from 'src/store/app/hooks';
import { PostData, SpaceStruct } from '@subsocial/types/dto';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/app/store';
import { useApi } from 'src/components/api';
import { fetchSpaces } from 'src/store/features/spaces/spacesSlice';
import { EntityId } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

const SpaceHiddenComponent = ({ content }: { content: PostData }) => {
  const space = useSelectSpace(content?.struct?.spaceId as string);
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      fetchSpaces({
        api,
        ids: [content?.struct?.spaceId as unknown as EntityId],
        withUnlisted: true,
      })
    );
  }, [api, dispatch, content?.struct?.spaceId]);

  if (!space?.struct?.hidden) return null;
  return (
    <Alert
      className={styles.warning}
      severity={'warning'}
      action={
        <ButtonTogglerVisibility
          contentStruct={space?.struct as unknown as SpaceStruct}
          typeContent={TypeContent.Space}
          withLoader
        />
      }
      icon={<ErrorIcon />}
    >
      {t('generalMessages.hiddenPostBySpace')}
    </Alert>
  );
};

export default SpaceHiddenComponent;
