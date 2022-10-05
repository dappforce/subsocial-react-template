import { AnyAccountId } from '@subsocial/api/types';

export const toShortAddress = (_address: AnyAccountId) => {
  const address = (_address || '').toString();

  return address.length > 13
    ? `${address.slice(0, 6)}…${address.slice(-6)}`
    : address;
};
