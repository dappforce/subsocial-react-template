import React, { FC, useState } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
} from '@mui/material';
import styles from './SwitchAccount.module.sass';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/rtk/app/store';
import { SwitchAccountContentProps } from 'src/models/account';
import Snackbar from '../common/snackbar/Snackbar';
import { useModal } from '../../hooks/useModal';
import { useSnackbar } from 'src/hooks/useSnackbar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import { useTranslation } from 'react-i18next';
import Image from '../common/image/Image';
import CardWrapper from '../common/card-wrapper/CardWrapper';

import languages from 'src/config/languages';

const SwitchAccountMenu: FC<SwitchAccountContentProps> = ({ onClose }) => {
  const router = useRouter();
  const { address } = useAppSelector((state) => state.myAccount);
  const { toggleModal, isVisible } = useModal();
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const profile = useSelectProfile(address);
  const { t, i18n } = useTranslation()
  const [ancherLanguege, setAncherLanguage] = useState<null | HTMLElement>(null)

  const handleClickLanguages = (event: React.MouseEvent<HTMLElement>) => {
    setAncherLanguage(ancherLanguege ? null : event.currentTarget)
  }
  const menu = [
    {
      label: 'My profile',
      icon: <PersonOutlineIcon />,
      href: `/accounts/${address}`,
    },
    {
      label: 'Edit my profile',
      icon: <ModeEditOutlineOutlinedIcon />,
      href: !profile ? `/accounts/new` : `/accounts/${address}/edit`,
    },
    { label: 'Settings', icon: <SettingsOutlinedIcon />, href: `` },
  ];

  const onClickMenu = (href: string) => {
    if (href) {
      router.push(href);
      onClose();
      return;
    }
    toggleModal();
    setSnackConfig({ message: 'Coming soon...' });
  };

  return (
    <>
      <Snackbar
        type={type}
        open={isVisible}
        message={message}
        onClose={() => {
          toggleModal();
          removeSnackbar();
        }}
      />
      <List className={styles.profileContainer}>
        <Divider variant="middle" className={styles.firstDivider} />
        {menu.map((item) => (
          <ListItem
            button
            key={item.label}
            className={styles.item}
            onClick={() => onClickMenu(item.href)}
          >
            <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem
          button
          className={styles.item}
          onClick={handleClickLanguages}
        >
          <ListItemIcon className={styles.icon}>
            <Image src='/translation.svg' alt='translation' width={24} height={24} />
          </ListItemIcon>
          <ListItemText className={styles.language}>
            {`Language: ${languages[i18n.language]}`}
            {Boolean(ancherLanguege) ? <ExpandLess /> : <ExpandMore />}
          </ListItemText>
        </ListItem>
        <Popper
          open={Boolean(ancherLanguege)}
          anchorEl={ancherLanguege}
          className={styles.popper}
          placement={'bottom-end'}
        >
          <CardWrapper className={styles.cardLanguage}>
            <List disablePadding>
                {Object.keys(languages).map(id => (
                  <>
                    <ListItem
                      key={'language'}
                      button
                      className={styles.itemLanguage}
                      onClick={() => i18n.changeLanguage(id)}
                    >
                      {i18n.language === id && <ListItemIcon className={styles.iconLanguage}>
                        <Image src={'/LanguageCheck.svg'} alt={'check'} width={24} height={24} />
                      </ListItemIcon>}
                      <ListItemText className={i18n.language === id ? styles.selectedLanguage : styles.unselectedLanguage}>
                        {languages[id]}
                      </ListItemText>
                    </ListItem>
                  </>
                ))}
            </List>
          </CardWrapper>
        </Popper>
        <Divider variant="middle" className={styles.lastDivider} />
      </List>
    </>
  );
};

export default SwitchAccountMenu;
