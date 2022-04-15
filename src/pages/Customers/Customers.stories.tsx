import { Story, Meta } from '@storybook/react'
import { Customers } from '.'

export default {
  title: 'Components/Customers',
  component: Customers
} as Meta

const Template: Story = () => <Customers />

export const Default = Template.bind({})
