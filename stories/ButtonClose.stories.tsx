import { Meta } from '@storybook/react'
import ButtonCloseComponent from '../src/components/common/button/button-close/ButtonClose'

export default {
    component: ButtonCloseComponent,
    title: 'Buttons/Button Close',
} as Meta

export const ButtonClose = () => <div style={{position: 'relative', width: '50px'}}><ButtonCloseComponent/></div>
