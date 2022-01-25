import { FC } from 'react';
import styles from './SeeMore.module.sass';
import Link from '../link/Link';
import { SeeMoreProps } from 'src/models/common/link';

const SeeMore: FC<SeeMoreProps> = ({
  href,
  className: inputClassName,
  ...props
}) => {
  const className = inputClassName
    ? `${styles.link} ${inputClassName}`
    : styles.link;
  return (
    <Link href={href} className={className} {...props}>
      See more
    </Link>
  );
};

export default SeeMore;
