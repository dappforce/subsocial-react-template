import BN from 'bn.js';

export type BalanceType = BN | string | number;

export interface BalanceProps {
  address?: string;
  isIcon: boolean;
  className?: string;
}
