import { Meta } from '@storybook/react'
import Link from '../src/components/common/links/link/Link'
import { CardActions } from '@mui/material'
import IconLink from '../src/components/common/links/icon-link/IconLink'

export default {
    component: Link,
    title: 'Shared/Links',
} as Meta

const links = [
    'https://test.com/',
    'https://twitter.com/test',
    'https://www.linkedin.com/in/test/',
    'https://t.me/test',
    'https://github.com/test',
    'https://medium.com/test',
    'https://www.youtube.com/channel/test',
    'https://www.reddit.com/user/Test',
    'https://www.facebook.com/user/Test',
]

export const IconLinks = () => <CardActions sx={{pl: 2, pr: 2, pb: 2, pt: 0, flexWrap: 'wrap', gap: 1}}>
    {links.map(link => <IconLink link={link} key={link}/>)}
</CardActions>
