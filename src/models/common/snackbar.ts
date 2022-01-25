export enum SnackbarType {
  Info = 'info',
  Error = 'error',
}

export interface SnackbarProps {
  type: SnackbarType;
  open: boolean;
  onClose?: () => void;
  message: string;
  withAutoHide?: boolean;
  withLoader?: boolean;
}
