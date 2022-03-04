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
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/store/app/store';
import { SwitchAccountContentProps } from 'src/models/account';
import Snackbar from '../common/snackbar/Snackbar';
import { useModal } from '../../hooks/useModal';
import { useSnackbar } from 'src/hooks/useSnackbar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { useTranslation } from 'react-i18next';
import Image from '../common/image/Image';
import CardWrapper from '../common/card-wrapper/CardWrapper';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import languages from 'src/i18n/languages';

const SwitchAccountMenu: FC<SwitchAccountContentProps> = ({ onClose }) => {
  const router = useRouter();
  const { address } = useAppSelector((state) => state.myAccount);
  const { toggleModal, isVisible } = useModal();
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const profile = useSelectProfile(address);
  const [lng, setLng] = useLocalStorage('i18nextLng', '');
  const { t, i18n } = useTranslation();
  const [anchorLanguage, setAnchorLanguage] = useState<null | HTMLElement>(
    null
  );

  const handleClickLanguages = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLanguage(anchorLanguage ? null : event.currentTarget);
  };

  const onClickMenu = (href: string) => {
    if (href) {
      router.push(href);
      onClose();
      return;
    }
    toggleModal();
    setSnackConfig({ message: 'Coming soon...' });
  };

  const onClickLanguage = (languane: string) => {
    i18n.changeLanguage(languane);
    setLng(languane);
    setAnchorLanguage(null);
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
        <ListItem
          button
          key={'my profile'}
          className={styles.item}
          onClick={() => onClickMenu(`/accounts/${address}`)}
        >
          <ListItemIcon className={styles.icon}>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={t('buttons.myProfile')} />
        </ListItem>
        <ListItem
          button
          key={'edit my profile'}
          className={styles.item}
          onClick={() =>
            onClickMenu(
              !profile ? `/accounts/new` : `/accounts/${address}/edit`
            )
          }
        >
          <ListItemIcon className={styles.icon}>
            <ModeEditOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t('buttons.editMyProfile')} />
        </ListItem>
        <ListItem button className={styles.item} onClick={handleClickLanguages}>
          <ListItemIcon className={styles.icon}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText className={styles.language}>
            {`${t('buttons.Language')}: ${languages[i18n.language]}`}
            {Boolean(anchorLanguage) ? <ExpandLess /> : <ExpandMore />}
          </ListItemText>
        </ListItem>
        <Popper
          open={Boolean(anchorLanguage)}
          anchorEl={anchorLanguage}
          className={styles.popper}
          placement={'bottom-end'}
        >
          <CardWrapper className={styles.cardLanguage}>
            <List disablePadding key={'language'}>
              {Object.keys(languages).map((id) => (
                <ListItem
                  key={'language'}
                  button
                  className={styles.itemLanguage}
                  onClick={() => onClickLanguage(id)}
                >
                  {i18n.language === id && (
                    <ListItemIcon className={styles.iconLanguage}>
                      <Image
                        src={'/LanguageCheck.svg'}
                        alt={'check'}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    className={
                      i18n.language === id
                        ? styles.selectedLanguage
                        : styles.unselectedLanguage
                    }
                  >
                    {languages[id]}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </CardWrapper>
        </Popper>
        <ListItem
          button
          key={'setting'}
          className={styles.item}
          onClick={() => onClickMenu('')}
        >
          <ListItemIcon className={styles.icon}>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t('buttons.settings')} />
        </ListItem>
        <Divider variant="middle" className={styles.lastDivider} />
      </List>
    </>
  );
};

export default SwitchAccountMenu;
