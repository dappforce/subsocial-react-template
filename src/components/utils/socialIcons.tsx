import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import { GrMedium } from 'react-icons/gr'
import { SiReddit, SiTelegram } from 'react-icons/si'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { FiYoutube } from 'react-icons/fi'

type SocialBrand =
    'facebook' |
    'twitter' |
    'medium' |
    'linkedIn' |
    'gitHub' |
    'instagram' |
    'youTube' |
    'reddit' |
    'telegram'

export type LinkLabel = SocialBrand | 'website'

export const getLinkIcon = (brand?: LinkLabel) => {
    const iconSize = 20

    switch (brand) {
        case 'facebook':
            return <FacebookOutlinedIcon sx={{fontSize: iconSize, transform: 'scale(1.2)'}}/>
        case 'twitter':
            return <TwitterIcon sx={{fontSize: iconSize}}/>
        case 'medium':
            return <GrMedium size={iconSize}/>
        case 'linkedIn':
            return <BsLinkedin size={iconSize}/>
        case 'gitHub':
            return <BsGithub size={iconSize}/>
        case 'instagram':
            return <InstagramIcon sx={{fontSize: iconSize}}/>
        case 'youTube':
            return <FiYoutube size={iconSize}/>
        case 'telegram':
            return <SiTelegram size={iconSize}/>
        case 'reddit':
            return <SiReddit size={iconSize}/>
        case 'website':
            return <LanguageIcon sx={{fontSize: iconSize}}/>
        default:
            return <LanguageIcon sx={{fontSize: iconSize}}/>
    }
}

const linkPrefix = '^(https?:\/\/)?([a-z0-9-]+\.)?'

const newSocialLinkRegExp = (brandDomain: string): RegExp => {
    return new RegExp(linkPrefix + brandDomain)
}

const socialLinksRegExp: Record<SocialBrand, RegExp[]> = {
    facebook: [
        newSocialLinkRegExp('facebook.com'),
        newSocialLinkRegExp('fb.me'),
        newSocialLinkRegExp('fb.com'),
        newSocialLinkRegExp('facebook.me')
    ],
    twitter: [
        newSocialLinkRegExp('twitter.com')
    ],
    medium: [
        newSocialLinkRegExp('medium.com')
    ],
    linkedIn: [
        newSocialLinkRegExp('linkedin.com'),
        newSocialLinkRegExp('linked.in')
    ],
    gitHub: [
        newSocialLinkRegExp('github.com')
    ],
    instagram: [
        newSocialLinkRegExp('instagram.com'),
        newSocialLinkRegExp('instagr.am')
    ],
    youTube: [
        newSocialLinkRegExp('youtube.com'),
        newSocialLinkRegExp('youtu.be')
    ],
    telegram: [
        newSocialLinkRegExp('t.me'),
        newSocialLinkRegExp('telegram.me')
    ],
    reddit: [
        newSocialLinkRegExp('reddit.com'),
    ]
}

const isSocialBrandLink = (brand: SocialBrand, link: string): boolean => {
    if (!link) {
        return false
    }

    link = link.trim().toLowerCase()
    return !!socialLinksRegExp[brand].find(r => r.test(link))
}

export const getLinkBrand = (link: string): LinkLabel | undefined => {
    for (const key in socialLinksRegExp) {
        const brand = key as SocialBrand
        if (isSocialBrandLink(brand, link)) {
            return brand
        }
    }
    return 'website'
}
