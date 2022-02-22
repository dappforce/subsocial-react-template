import { useAppSelector } from '../../app/store';

export function useMyAddress() {
  return useAppSelector((state) => state.myAccount.address);
}
