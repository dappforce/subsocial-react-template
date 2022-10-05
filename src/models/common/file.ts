import { IpfsCid } from '@subsocial/api/types';
import {Dispatch, SetStateAction} from 'react';

export interface FileProps {
  type: 'avatar' | 'image';
  image?: string;
  setImage?: (image: string) => void;
  setCidImage: Dispatch<SetStateAction<IpfsCid | undefined>>;
  setMbError: (value: boolean) => void;
  className?: string;
}
