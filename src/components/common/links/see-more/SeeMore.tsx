import { FC } from 'react';
import styles from './SeeMore.module.sass';
import Link from '../link/Link';
import { SeeMoreProps } from 'src/models/common/link';
import { useTranslation } from 'react-i18next';

const SeeMore: FC<SeeMoreProps> = ({
  href,
  className: inputClassName,
  ...props
}) => {
  const { t } = useTranslation();
  const className = inputClassName
    ? `${styles.link} ${inputClassName}`
    : styles.link;
  return (
    <Link href={href} className={className} {...props}>
      {t('general.seeMore')}
    </Link>
  );
};

export default SeeMore;
