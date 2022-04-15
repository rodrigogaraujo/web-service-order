import { Story, Meta } from '@storybook/react'
import { UserForm } from '.'

export default {
  title: 'Components/Users/UserForm',
  component: UserForm
} as Meta

const Template: Story = () => <UserForm />

export const Default = Template.bind({})
