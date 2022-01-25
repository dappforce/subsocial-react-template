import { FC } from 'react';
import NextLink from 'next/link';
import styles from './Link.module.sass';
import { LinkProps } from 'src/models/common/link';

const Link: FC<LinkProps> = ({
  href,
  ext = false,
  image,
  as,
  className: inputClassName,
  children,
  ...props
}) => {
  const className = inputClassName
    ? `${styles.link} ${inputClassName}`
    : styles.link;
  return ext ? (
    <a
      className={`${className} ${image ? styles.image : ''} ${styles.external}`}
      {...props}
      target={'_blank'}
      rel="noreferrer"
      href={href as string}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href} as={as} replace>
      <a className={`${className} ${image ? styles.image : ''}`} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
