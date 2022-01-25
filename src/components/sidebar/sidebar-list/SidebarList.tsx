import React, { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import styles from './SidebarList.module.sass';

import Image from '../../../components/common/image/Image';
import { ElementProps } from 'src/models/sidebar';

const SidebarList: FC<ElementProps> = (props) => {
  const { item, show } = props;
  return (
    <ListItem button className={styles.listItem}>
      <Image src={item.img} width={20} height={20} alt={item.name} />
      {show && <ListItemText primary={item.name} className={styles.itemText} />}
    </ListItem>
  );
};

export default SidebarList;
