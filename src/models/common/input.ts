import { ChangeEvent } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  isError?: boolean;
  errorText?: string;
  value?: any;
  onChange?: (event: any) => void;
  isRequired?: boolean;
  isMultiline?: boolean;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  InputProps?: any;
  defaultValue?: string;
  minRows?: number;
}

export interface TagsInputProps {
  placeholder?: string;
  tags: string[];
  setTags: any;
  className?: string;
}

export interface InputMoneyProps {
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  placeholder: string;
  onClose: () => void;
  className?: string
}
