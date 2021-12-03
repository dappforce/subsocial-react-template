import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Icon from '../common/icons/Icon'
import { linkidIn, medium, reddit, telegram, youtube } from '../../assets'
import LanguageIcon from '@mui/icons-material/Language';

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

const brandsWithProfiles: SocialBrand[] = [
    'facebook',
    'twitter',
    'medium',
    'linkedIn',
    'gitHub',
    'instagram',
    'youTube',
    'telegram',
    'reddit'
]

export const hasSocialMediaProfiles = (brand: LinkLabel): boolean => {
    return brandsWithProfiles.indexOf(brand as SocialBrand) >= 0
}

export const getLinkIcon = (brand?: LinkLabel) => {
    switch (brand) {
        case 'facebook': return <FacebookOutlinedIcon sx={{width: 22, height: 22, transform: 'scale(1.05)'}} />
        case 'twitter': return <TwitterIcon sx={{width: 22, height: 22}} />
        case 'medium': return <Icon src={medium}  height={20} width={20} alt={'medium'}  />
        case 'linkedIn': return <Icon src={linkidIn}  height={20} width={20} alt={'linkidIn'}/>
        case 'gitHub': return <GitHubIcon sx={{width: 22, height: 22}}/>
        case 'instagram': return <InstagramIcon sx={{width: 21, height: 21}}/>
        case 'youTube': return <Icon height={26} width={26} src={youtube} alt={'youtube'}/>
        case 'telegram': return <Icon height={20} width={20} src={telegram} alt={'telegram'}/>
        case 'reddit': return <Icon height={20} width={20} src={reddit} alt={'reddit'}/>
        case 'website': return <LanguageIcon sx={{width: 22, height: 22}}/>
        default: return <LanguageIcon sx={{width: 20, height: 20}}/>
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
