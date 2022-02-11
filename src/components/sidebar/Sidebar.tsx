import React, {FC} from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,} from '@mui/material';
import Text from 'src/components/common/text/Text'
import styles from './Sidebar.module.sass';
import Image from '../common/image/Image';
import {SidebarProps} from "../../models/sidebar";
import {useResponsiveSize} from "../responsive/ResponsiveContext";
import {TextSizes} from "../../models/common/typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';

const Sidebar: FC<SidebarProps> = ({ isShowingMobileBurger, onSidebarClose }) => {
  const { isDesktop } = useResponsiveSize();
  const { t } = useTranslation();

  const frameworks = [
    {
      name: 'Angular app',
      icon: <Image src={'/angular.svg'} alt={'angular'} width={20} height={22} />,
      href: '/',
    },
    {
      name: 'Vue app',
      icon: <Image src={'/vue.svg'} alt={'vue'} width={20} height={17} />,
      href: '/',
    },
  ];

  const additional = [
    {
      name: 'Subsocial app',
      icon: <Image src={'/favicon.ico'} alt={'Subsocial app'} width={20} height={20} />,
      href: '/',
    },
    {
      name: t('buttons.landingPage'),
      icon: <LanguageIcon />,
      href: '/',
    },
    {
      name: t('buttons.legalDocuments'),
      icon: <DescriptionOutlinedIcon />,
      href: '/',
    },
    {
      name: t('buttons.github'),
      icon: <GitHubIcon />,
      href: '/',
    },
    {
      name: t('buttons.whatIsSubsocial'),
      icon: <HelpOutlineIcon />,
      href: '/',
    },
  ];

  const social = [
    {
      name: 'Twitter',
      icon: <Image src={'/twitter.svg'} alt={'Twitter'} width={15} height={15} />,
      href: '/',
    },
    {
      name: 'Discord',
      icon: <Image src={'/discord.svg'} alt={'Discord'} width={15} height={15} />,
      href: '/',
    },
    {
      name: 'Telegram',
      icon: <Image src={'/telegram2.svg'} alt={'Telegram'} width={15} height={15} />,
      href: '/',
    },
    {
      name: 'Megaphone',
      icon: <Image src={'/megaphone.svg'} alt={'Megaphone'} width={15} height={15} />,
      href: '/',
    },
  ];

  return (
    <Drawer
      open={isShowingMobileBurger}
      onClose={onSidebarClose}
      variant={!isDesktop ? 'temporary' : 'permanent'}
      className={styles.drawer}
    >
      <Box className={styles.topBox}>
        <List className={styles.list}>
          {frameworks.map(framework => (
            <ListItem
              button
              key={framework.name}
              className={styles.item}
            >
              <ListItemIcon className={styles.icon}>
                {framework.icon}
              </ListItemIcon>
              <ListItemText>
                <Text type={!isDesktop ? TextSizes.NORMAL : TextSizes.SECONDARY}>
                  {framework.name}
                </Text>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <div className={styles.divider}>
          <Divider  />
        </div>
        <List className={styles.list}>
          {additional.map(item => (
            <ListItem
              button
              key={item.name}
              className={styles.item}
            >
              <ListItemIcon className={styles.icon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText>
                <Text type={!isDesktop ? TextSizes.NORMAL : TextSizes.SECONDARY}>
                  {item.name}
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
          {social.map(item => (
            <ListItemIcon
              key={item.name}
              className={styles.socialIcon}
            >
              {item.icon}
            </ListItemIcon>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
