import React, { FC } from 'react';
import { ListItem } from '@mui/material';
import styles from './SidebarHorizontalList.module.sass';

import Image from '../../../components/common/image/Image';
import { ElementProps } from 'src/models/sidebar';

const SidebarHorizontalList: FC<ElementProps> = (props) => {
  const { item, show } = props;
  return (
    <ListItem button className={styles.listItem}>
      <Image src={item.img} width={30} height={30} alt={item.name} />
    </ListItem>
  );
};

export default SidebarHorizontalList;
