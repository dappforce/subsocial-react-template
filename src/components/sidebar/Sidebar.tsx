import React, { FC } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Text from 'src/components/common/text/Text';
import styles from './Sidebar.module.sass';
import { SidebarProps } from '../../models/sidebar';
import { useResponsiveSize } from '../responsive/ResponsiveContext';
import { TextSizes } from '../../models/common/typography';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Size, useDrawerSize } from 'src/hooks/useDrawerSize';
import { additional, frameworks, social } from './sidebar-menu';

const Sidebar: FC<SidebarProps> = ({
  isShowingMobileBurger,
  onSidebarClose,
}) => {
  const { isDesktop } = useResponsiveSize();
  const { t } = useTranslation();
  const size: Size = useDrawerSize();

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isShowingMobileBurger}
      onClose={onSidebarClose}
      className={classNames(styles.drawer, {
        [styles.drawerOpenMobile]: isShowingMobileBurger,
      })}
    >
      <div style={{ height: `${size.height}px` }} className={styles.wrapper}>
        <Box className={styles.topBox}>
          <List className={styles.list}>
            {frameworks.map((framework) => (
              <ListItem button key={framework.name} className={styles.item}>
                <ListItemIcon className={styles.icon}>
                  {framework.icon}
                </ListItemIcon>
                <ListItemText>
                  <Text
                    type={!isDesktop ? TextSizes.NORMAL : TextSizes.SECONDARY}
                  >
                    {t(framework.name)}
                  </Text>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <div className={styles.divider}>
            <Divider />
          </div>
          <List className={styles.list}>
            {additional.map((item) => (
              <ListItem button key={item.name} className={styles.item}>
                <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Text
                    type={!isDesktop ? TextSizes.NORMAL : TextSizes.SECONDARY}
                  >
                    {t(item.name)}
                  </Text>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={styles.bottomBox}>
          <Text
            type={!isDesktop ? TextSizes.NORMAL : TextSizes.SECONDARY}
            className={styles.socialText}
          >
            {t('serverApp.social')}
          </Text>
          <List className={styles.socialList}>
            {social.map((item) => (
              <ListItemIcon key={item.name} className={styles.socialIcon}>
                {item.icon}
              </ListItemIcon>
            ))}
          </List>
        </Box>
      </div>
    </Drawer>
  );
};

export default Sidebar;
