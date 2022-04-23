import { Story, Meta } from '@storybook/react'
import { ServiceOrder } from '.'

export default {
  title: 'Components/ServiceOrder',
  component: ServiceOrder
} as Meta

const Template: Story = () => <ServiceOrder />

export const Default = Template.bind({})
