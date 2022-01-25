import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { isDef } from '@subsocial/utils';
import { asAccountId } from '@subsocial/api';
import { useMyAddress } from '../rtk/features/myAccount/myAccountHooks';
import { AnyAccountId } from '@subsocial/types';

export const useIsMySpace = (space?: SpaceStruct) =>
  useIsMyAddress(space?.ownerId) && isDef(space);

export function useIsMyAddress(anotherAddress?: AnyAccountId) {
  return equalAddresses(useMyAddress(), anotherAddress);
}

type MaybeAccAddr = undefined | AnyAccountId;

export function equalAddresses(
  addr1: MaybeAccAddr,
  addr2: MaybeAccAddr
): boolean {
  if (addr1 === addr2) {
    return true;
  } else if (!addr1 || !addr2) {
    return false;
  } else {
    return asAccountId(addr1)?.eq(asAccountId(addr2)) || false;
  }
}
