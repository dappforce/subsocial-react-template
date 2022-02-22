import { FC } from 'react';
import styles from './Text.module.sass';
import { TextProps } from '../../../models/common/typography';
import { Typography } from '@mui/material';

const Text: FC<TextProps> = ({
  type,
  children,
  className: inputClassName,
  ...props
}) => {
  const className = inputClassName
    ? `${styles.text} ${styles[type]} ${inputClassName}`
    : `${styles.text} ${styles[type]}`;

  return (
    <Typography component={'span'} className={className} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
