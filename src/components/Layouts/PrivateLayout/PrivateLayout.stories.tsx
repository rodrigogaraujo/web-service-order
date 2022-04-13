import { Story, Meta } from '@storybook/react'
import { Login } from '~/pages/auth/Login'
import { PrivateLayout } from '.'

export default {
  title: 'Components/PrivateLayout',
  component: PrivateLayout
} as Meta

const Template: Story = () => (
  <PrivateLayout>
    <Login />
  </PrivateLayout>
)

export const Default = Template.bind({})
