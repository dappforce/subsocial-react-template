export enum AvatarSizes {
    SMALLEST = 30,
    SMALLER = 38,
    SMALL = 40,
    MEDIUM = 46,
    LARGE = 80,
    HUGE = 100
}

export interface AvatarProps {
    src?: any
    size: AvatarSizes
    id: string
}
