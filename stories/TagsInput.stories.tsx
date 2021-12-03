import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import TagsInputComponent from '../src/components/common/inputs/tags-input/TagsInput'

export default {
    component: TagsInputComponent,
    title: 'Inputs/Tags Input',
} as Meta

const Template: Story<ComponentProps<typeof TagsInputComponent>> = (args) => {
    return <TagsInputComponent {...args} />
}

export const TagsInput = Template.bind({})
TagsInput.args = {
    tags: ['subsocial', 'polkadot', 'substrate'],
    setTags: () => {}
}
