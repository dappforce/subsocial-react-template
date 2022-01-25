import { CircularProgress } from '@mui/material';
import styles from './Loader.module.sass';
import Text from '../text/Text';
import { TextSizes } from 'src/models/common/typography';
import { FC } from 'react';

const Loader: FC<{ label?: string; className?: string }> = ({
  label,
  className: inputClassName,
}) => {
  const className = inputClassName
    ? `${styles.loader} ${inputClassName}`
    : styles.loader;
  return (
    <div className={className}>
      <CircularProgress size={20} />
      {label && (
        <Text type={TextSizes.SECONDARY} className={styles.text}>
          {label}
        </Text>
      )}
    </div>
  );
};

export default Loader;
