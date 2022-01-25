import { useState } from 'react';
import { SnackbarType } from 'src/models/common/snackbar';

interface SnackConfigProps {
  message: string;
  type?: SnackbarType;
  isLoader?: boolean;
}

export const useSnackbar = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState(SnackbarType.Info);
  const [isLoader, setLoader] = useState(false);

  const setSnackConfig = ({
    message,
    type = SnackbarType.Info,
    isLoader = false,
  }: SnackConfigProps) => {
    setType(type);
    setMessage(message);
    setLoader(isLoader);
  };

  const removeSnackbar = () => {
    setType(SnackbarType.Info);
    setMessage('');
    setLoader(false);
  };

  return {
    message,
    type,
    isLoader,
    setSnackConfig,
    removeSnackbar,
  };
};
