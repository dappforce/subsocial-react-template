import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import { HTMLAttributes } from 'react';

export interface IconLinkProps {
  link: string;
}

interface Link extends NextLinkProps {
  image?: boolean;
}

export type LinkProps = Link &
  HTMLAttributes<HTMLAnchorElement> & { ext?: boolean };

export type SeeMoreProps = HTMLAttributes<HTMLAnchorElement> & NextLinkProps;

export type SmallLinkProps = HTMLAttributes<HTMLAnchorElement> & NextLinkProps;
