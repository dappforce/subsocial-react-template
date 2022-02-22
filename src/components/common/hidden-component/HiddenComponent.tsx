import styles from './HiddenComponent.module.sass';
import ErrorIcon from '@mui/icons-material/Error';
import { Alert } from '@mui/material';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { TypeContent } from 'src/models/common/button';
import { PostData, PostStruct, SpaceData } from '@subsocial/types/dto';
import { useTranslation } from 'react-i18next';

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
        return t('generalMessages.hiddenPost');
      case TypeContent.Space:
        return t('generalMessages.hiddenSpace');
      case TypeContent.Comment:
        return t('generalMessages.hiddenComment');
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
    icon={<ErrorIcon/>}
  >
    {message}
  </Alert>
)};

export default HiddenComponent;
