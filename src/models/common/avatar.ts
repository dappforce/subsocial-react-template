export enum AvatarSizes {
  SMALLEST = 22,
  SMALLER = 36,
  SMALL = 38,
  MEDIUM = 40,
  LARGE = 46,
  HUGE = 60,
  HUGEST = 80,
}

export interface AvatarProps {
  src?: any;
  size: AvatarSizes;
  id: string | undefined;
}
