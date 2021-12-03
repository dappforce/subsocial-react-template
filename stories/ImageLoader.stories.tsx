import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import File from '../src/components/common/file/File'

export default {
    component: File,
    title: 'Shared/Image Loader',
} as Meta

const Template: Story<ComponentProps<typeof File>> = (args) => {
    return <File {...args} />
}

export const ImageLoader = Template.bind({})
ImageLoader.args = {
    type: 'avatar',
}
