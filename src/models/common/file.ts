import { IpfsCid } from '@subsocial/types';

export interface FileProps {
  type: 'avatar' | 'image';
  image?: string;
  setImage?: (image: string) => void;
  setCidImage: (cid: IpfsCid) => void;
  setMbError: (value: boolean) => void;
}
