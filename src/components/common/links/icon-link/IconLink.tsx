import { FC } from 'react';
import styles from './IconLink.module.sass';
import { getLinkBrand, getLinkIcon } from '../../../utils/socialIcons';
import { IconLinkProps } from 'src/models/common/link';

const IconLink: FC<IconLinkProps> = ({ link }) => {
  const brand = getLinkBrand(link);

  return (
    <a target="_blank" rel="noreferrer" href={link} className={styles.link}>
      {getLinkIcon(brand)}
    </a>
  );
};

export default IconLink;
