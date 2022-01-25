import { TextField } from '@mui/material';
import { FC } from 'react';
import styles from './Input.module.sass';
import { InputProps } from 'src/models/common/input';

const Input: FC<InputProps> = (props) => {
  return (
    <TextField
      className={styles.input}
      required={props.isRequired}
      label={props.label}
      defaultValue={props.defaultValue}
      value={props.value}
      fullWidth
      onChange={props.onChange}
      color={'secondary'}
      placeholder={props.placeholder}
      helperText={props.errorText}
      error={props.isError}
      multiline={props.isMultiline}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      InputProps={props.InputProps}
      minRows={props.minRows}
    />
  );
};

export default Input;
