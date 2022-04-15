import { Story, Meta } from '@storybook/react'
import { CustomerForm } from '.'

export default {
  title: 'Components/Customer/CustomerForm',
  component: CustomerForm
} as Meta

const Template: Story = () => <CustomerForm />

export const Default = Template.bind({})
