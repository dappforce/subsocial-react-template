import { Meta } from '@storybook/react';
import SeeMoreComponent from 'src/components/common/links/see-more/SeeMore';

export default {
  component: SeeMoreComponent,
  title: 'Text/See More',
} as Meta;

export const SeeMore = () => <SeeMoreComponent href={''} />;
