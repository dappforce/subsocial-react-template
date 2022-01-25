import { FC } from 'react';
import styles from './ButtonEdit.module.sass';
import { ButtonProps } from '@mui/material/Button/Button';
import ButtonIcon from '../button-icon/ButtonIcon';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const ButtonEdit: FC<ButtonProps> = (props) => {
  return (
    <ButtonIcon className={styles.button} {...props}>
      <ModeEditOutlineOutlinedIcon width={15} height={15} />
    </ButtonIcon>
  );
};

export default ButtonEdit;
