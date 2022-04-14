import { Story, Meta } from '@storybook/react'
import { Users } from '.'

export default {
  title: 'Components/Users',
  component: Users
} as Meta

const Template: Story = () => <Users />

export const Default = Template.bind({})
