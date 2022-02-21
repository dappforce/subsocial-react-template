import { Meta } from '@storybook/react';
import Link from 'src/components/common/links/link/Link';
import IconLink from 'src/components/common/links/icon-link/IconLink';
import { Box } from '@mui/system';
import React from 'react';

export default {
  component: Link,
  title: 'Shared/Links',
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

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
];

export const IconLinks = () => <>{links.map((link) => <IconLink link={link} key={link} />)}</>;
