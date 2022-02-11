import { FC } from 'react';
import Text from '../../text/Text';
import { TextSizes } from 'src/models/common/typography';
import styles from './ButtonShare.module.sass';
import ButtonIcon from '../button-icon/ButtonIcon';
import { ButtonShareProps } from 'src/models/common/button';
import { useTranslation } from 'react-i18next';
import RepeatIcon from '@mui/icons-material/Repeat'

const ButtonShare: FC<ButtonShareProps> = ({
  onClick,
  isShowLabel,
  value ,
}) => {
  const { t } = useTranslation()

  return (
    <ButtonIcon onClick={onClick}>
      <RepeatIcon />
      {isShowLabel && (
        <Text type={TextSizes.NORMAL} className={styles.label}>
          {t('buttons.share')}
          {' '}
          {value || 0 > 0 ? `(${value})` : null}
        </Text>
      )}
      {!isShowLabel && value || 0 > 0 ? (
        <Text type={TextSizes.NORMAL} className={styles.value}>
          {value}
        </Text>
      ) : null}
    </ButtonIcon>
  );
};

export default ButtonShare;
