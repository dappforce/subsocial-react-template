import styles from './HiddenComponent.module.sass';
import ErrorIcon from '@mui/icons-material/Error';
import { Alert } from '@mui/material';
import { ButtonTogglerVisibility } from '../button/button-toggler-visibility/ButtonTogglerVisibility';
import { TypeContent } from 'src/models/common/button';
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { PostData, SpaceData } from '@subsocial/api/flat-subsocial/dto';

const HiddenComponent = ({
  data,
  typeContent,
}: {
  data: PostData | SpaceData;
  typeContent: TypeContent;
}) => (
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
    {`This ${typeContent} is unlisted and only you can see it`}
  </Alert>
);

export default HiddenComponent;
