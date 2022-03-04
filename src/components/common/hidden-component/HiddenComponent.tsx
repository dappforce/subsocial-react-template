import styles from './HiddenComponent.module.sass';
import ErrorIcon from '@mui/icons-material/Error';
import { Alert } from '@mui/material';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { TypeContent } from 'src/models/common/button';
import { PostData, PostStruct, SpaceData } from '@subsocial/types/dto';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const HiddenComponent = ({
  data,
  typeContent,
}: {
  data: PostData | SpaceData;
  typeContent: TypeContent;
}) => {
  const { t } = useTranslation();

  const message = ((): string => {
    switch (typeContent) {
      case TypeContent.Post:
        return t('generalMessages.hiddenMessage', {type: t('Post').toLowerCase()});
      case TypeContent.Space:
        return t('generalMessages.hiddenMessage', {type: t('Space').toLowerCase()});
      case TypeContent.Comment:
        return t('generalMessages.hiddenMessage', {type: t('comment')});
      default:
        return '';
    }
  })();

  return (
    <Alert
      className={styles.warning}
      severity={'warning'}
      action={
        <ButtonTogglerVisibility
          contentStruct={data?.struct as unknown as PostStruct}
          typeContent={typeContent}
          withLoader
        />
      }
      icon={<ErrorIcon />}
    >
      {message}
    </Alert>
  );
};

export default memo(HiddenComponent);
