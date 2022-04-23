import { Story, Meta } from '@storybook/react'
import { Form } from '.'

export default {
  title: 'Components/ServiceOrder/ServiceOrderForm',
  component: Form
} as Meta

const user =  { id: 1, name: 'Snow', email: 'Jon', phone: '35', active: 1, _id: '123', type: 1, password: '123' }
const serviceOrder = { customer: { ...user, phone_number: '', document: '' },
  customer_id: user._id, user, user_id: user._id, description: 'Sem internet',
  priority: 2, status: 2 }

const Template: Story = () => <Form serviceOrder={serviceOrder} />

export const Default = Template.bind({})
