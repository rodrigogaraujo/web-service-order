import { Story, Meta } from '@storybook/react'
import { ServiceOrderForm } from '.'

export default {
  title: 'Components/ServiceOrder/ServiceOrderForm',
  component: ServiceOrderForm
} as Meta

const Template: Story = () => <ServiceOrderForm />

export const Default = Template.bind({})
