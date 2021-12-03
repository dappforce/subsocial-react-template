import { Meta, Story } from '@storybook/react'
import AvatarElement from '../src/components/common/avatar/AvatarElement'
import { AvatarSizes } from '../src/models/common/avatar'
import { ComponentProps } from 'react'

export default {
    component: AvatarElement,
    title: 'Shared/Avatar',

    args: {
        id: '3oGmzsdeGToQxtNbNrNYVP1mYVza5J2k9foBXav6WdbQTZqF',
        size: AvatarSizes.MEDIUM,
    }
} as Meta


const Template: Story<ComponentProps<typeof AvatarElement>> = (args) => {
    return <AvatarElement {...args} />
}
export const Avatar = Template.bind({})
Avatar.args = {
    src: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
}
Avatar.argTypes = {
    size: {
        options: Object.keys(AvatarSizes).filter(size => !Number(size)),
            mapping: AvatarSizes,
            control: {
            type: 'select',
        },
        defaultValue: AvatarSizes.SMALL
    },
}

const TemplateWithoutImage: Story<ComponentProps<typeof AvatarElement>> = (args) => {
    return <AvatarElement {...args} size={AvatarSizes.MEDIUM}/>
}

export const AvatarWithoutImage = TemplateWithoutImage.bind({})
AvatarWithoutImage.argTypes = {
    size: {control: {disable: true}, description: 'AvatarSizes type'}
}
