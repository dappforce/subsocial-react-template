import { FC } from 'react';
import styles from './Text.module.sass';
import { TextProps } from '../../../models/common/typography';
import { Typography } from '@mui/material';

const Text: FC<TextProps> = ({
  type,
  children,
  className: inputCalssName,
  ...props
}) => {
  const className = inputCalssName
    ? `${styles.text} ${styles[type]} ${inputCalssName}`
    : `${styles.text} ${styles[type]}`;

  return (
    <Typography component={'span'} className={className} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
