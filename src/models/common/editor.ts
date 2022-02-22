import { SimpleMDEReactProps } from 'react-simplemde-editor';

export type EditorProps = Omit<SimpleMDEReactProps, 'onChange'> & {
  toolbar?: boolean;
  onChange?: (value: string) => any | void;
  autofocus?: boolean;
};
