import { FC } from 'react';
import NextLink from 'next/link';
import styles from './SmallLink.module.sass';
import { SmallLinkProps } from '../../../../models/common/link';

const SmallLink: FC<SmallLinkProps> = ({
  href,
  as,
  children,
  className: inputClassName,
  ...props
}) => {
  const className = inputClassName
    ? `${styles.link} ${inputClassName}`
    : styles.link;

  return (
    <NextLink href={href} as={as}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default SmallLink;
