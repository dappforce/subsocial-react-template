import styles from './SpaceHiddenComponent.module.sass';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { TypeContent } from 'src/models/common/button';
import { useSelectSpace } from 'src/rtk/app/hooks';
import { PostData } from '@subsocial/api/flat-subsocial/dto';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/rtk/app/store';
import { useApi } from 'src/components/api';
import { fetchSpaces } from 'src/rtk/features/spaces/spacesSlice';
import { EntityId } from '@reduxjs/toolkit';

const SpaceHiddenComponent = ({ content }: { content: PostData }) => {
  const space = useSelectSpace(content?.struct?.spaceId as string);
  const dispatch = useAppDispatch();
  const { api } = useApi();

  useEffect(() => {
    if (!space) {
      dispatch(
        fetchSpaces({
          api,
          ids: [content?.struct?.spaceId as unknown as EntityId],
          withUnlisted: true,
        })
      );
    }
  });

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
      {'This post is not visible because its space is hidden'}
    </Alert>
  );
};

export default SpaceHiddenComponent;
