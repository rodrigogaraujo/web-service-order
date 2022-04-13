import { Story, Meta } from '@storybook/react'
import { Login } from './'

export default {
  title: 'Pages/Login',
  component: Login
} as Meta

const Template: Story = () => <Login />

export const Default = Template.bind({})