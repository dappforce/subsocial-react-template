import { FC } from 'react';
import styles from './ButtonComponent.module.sass';
import Button from '@mui/material/Button';
import { ButtonComponentProps } from 'src/models/common/button';

const ButtonComponent: FC<ButtonComponentProps> = (props) => {
  const {
    variant = 'outlined',
    children,
    disabled = false,
    className: inputClassName,
  } = props;
  const className = inputClassName
    ? `${styles.button} ${inputClassName}`
    : styles.button;

  return (
    <Button
      variant={variant}
      onClick={props.onClick}
      className={className}
      disabled={disabled}
      type={props.type || 'button'}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
