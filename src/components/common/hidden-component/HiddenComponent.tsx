import styles from './HiddenComponent.module.sass';
import ErrorIcon from '@mui/icons-material/Error';
import { Alert } from '@mui/material';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { TypeContent } from 'src/models/common/button';
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { PostData, SpaceData } from '@subsocial/api/flat-subsocial/dto';
import { useTranslation } from 'react-i18next';

const HiddenComponent = ({
  data,
  typeContent,
}: {
  data: PostData | SpaceData;
  typeContent: TypeContent;
}) => {
  const { t } = useTranslation();

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
    {t('generalMessages.hiddenMessage', {type: t(`general.${typeContent.toLowerCase()}`)})}
  </Alert>
)};

export default HiddenComponent;
