import Image from '../common/image/Image';
import React from 'react';
import { ItemType } from '../../models/sidebar';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const frameworks: ItemType[] = [
  {
    name: 'Angular App',
    icon: <Image src={'/angular.jpg'} alt={'angular'} width={20} height={22} />,
    href: '/',
  },
  {
    name: 'Vue App',
    icon: <Image src={'/vue.svg'} alt={'vue'} width={20} height={17} />,
    href: '/',
  },
];

export const additional: ItemType[] = [
  {
    name: 'buttons.subsocialApp',
    icon: (
      <Image
        src={'/favicon.ico'}
        alt={'Subsocial app'}
        width={20}
        height={20}
      />
    ),
    href: '/',
  },
  {
    name: 'buttons.landingPage',
    icon: <LanguageIcon />,
    href: '/',
  },
  {
    name: 'buttons.legalDocuments',
    icon: <DescriptionOutlinedIcon />,
    href: '/',
  },
  {
    name: 'buttons.github',
    icon: <GitHubIcon />,
    href: '/',
  },
  {
    name: 'buttons.whatIsSubsocial',
    icon: <HelpOutlineIcon />,
    href: '/',
  },
];

export const social: ItemType[] = [
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
    icon: (
      <Image src={'/telegram2.svg'} alt={'Telegram'} width={15} height={15} />
    ),
    href: '/',
  },
  {
    name: 'Megaphone',
    icon: (
      <Image src={'/megaphone.svg'} alt={'Megaphone'} width={15} height={15} />
    ),
    href: '/',
  },
];
