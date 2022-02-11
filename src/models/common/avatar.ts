export enum AvatarSizes {
  SMALLEST = 22,
  SMALLER = 30,
  SMALL = 36,
  MEDIUM = 38,
  LARGE = 40,
  HUGE = 46,
}

export interface AvatarProps {
  src?: any;
  size: AvatarSizes;
  id: string | undefined;
}
