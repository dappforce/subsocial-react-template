import { ReactNode } from 'react';

export interface SidebarProps {
  isShowingMobileBurger: boolean;
  onSidebarClose: () => void;
}

export type ItemType = {
  name: string;
  icon: ReactNode;
  href: string;
}
