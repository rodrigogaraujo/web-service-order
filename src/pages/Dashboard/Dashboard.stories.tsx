import { Story, Meta } from '@storybook/react'
import { Dashboard } from '.'

export default {
  title: 'Components/Dashboard',
  component: Dashboard
} as Meta

const Template: Story = () => <Dashboard />

export const Default = Template.bind({})
