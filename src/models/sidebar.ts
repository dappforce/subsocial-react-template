export interface SidebarProps {
  isShowingMobileBurger: boolean;
  onSidebarClose: () => void;
}

export type ItemType = { name: string; img: string };

export type ElementProps = {
  item: ItemType;
  show: boolean;
};
