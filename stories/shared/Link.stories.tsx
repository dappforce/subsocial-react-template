import { Meta } from '@storybook/react';
import Link from 'src/components/common/links/link/Link';

export default {
  component: Link,
  title: 'Shared/Links',
} as Meta;

export const StandardLink = () => <Link href={'/'}>Link</Link>;
