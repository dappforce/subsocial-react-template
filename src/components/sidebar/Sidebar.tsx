import React, { FC, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import styles from './Sidebar.module.sass';
import SidebarList from './sidebar-list/SidebarList';
import SidebarHorizontalList from './sidebar-horizontal-list/SidebarHorizontalList';
import Image from '../common/image/Image';

const Sidebar: FC = () => {
  const [show, setShow] = useState(false);

  const frameworks = [
    { name: 'Angular app', img: '/angular.svg' },
    { name: 'Vue app', img: '/vue.svg' },
  ];

  const additional = [
    { name: 'Subsocial app', img: '/favicon.ico' },
    { name: 'Landing page', img: '/world.svg' },
    { name: 'Legal Documents', img: '/file.svg' },
    { name: 'Github', img: '/github-2 1.svg' },
    { name: 'What is Subsocial?', img: '/info.svg' },
  ];

  const hiddenSocial = [
    { name: 'Twitter', img: '/twitter.svg' },
    { name: 'More', img: '/more.svg' },
  ];

  const social = [
    { name: 'Twitter', img: '/twitter.svg' },
    { name: 'Discord', img: '/discord.svg' },
    { name: 'Telegram', img: '/telegram2.svg' },
    { name: 'Megaphone', img: '/megaphone.svg' },
  ];

  return (
    <Drawer
      open={show}
      variant="permanent"
      className={styles.drawer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Box className={styles.topBox}>
        <List>
          {frameworks.map((item, index) => (
            <SidebarList item={item} key={index} show={show} />
          ))}
        </List>
        <Divider className={styles.divider} />
        <List>
          {additional.map((item, index) => (
            <SidebarList item={item} key={index} show={show} />
          ))}
        </List>
      </Box>
      <Box className={styles.bottomBox}>
        <List className={styles.bottomList}>
          {!show && (
            <>
              <ListItem button key={0} className={styles.listItemHide}>
                <Image
                  src={hiddenSocial[0].img}
                  width={30}
                  height={30}
                  alt={hiddenSocial[0].name}
                />
                <Image
                  src={hiddenSocial[1].img}
                  width={18}
                  height={18}
                  alt={hiddenSocial[1].name}
                />
              </ListItem>
            </>
          )}
          {show && (
            <div className={styles.bottomBlock}>
              <ListItemText
                primary="Our social links:"
                className={styles.itemText}
              />
              <div className={styles.bottom}>
                {social.map((item, index) => (
                  <SidebarHorizontalList item={item} key={index} show={show} />
                ))}
              </div>
            </div>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
