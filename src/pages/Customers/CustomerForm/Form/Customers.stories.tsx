import { Story, Meta } from '@storybook/react'
import { Form } from '.'

export default {
  title: 'Components/Customer/UserForm',
  component: Form
} as Meta

const customer =  { id: 1, name: 'Snow', document: '123123',email: 'Jon', phone_number: '35', active: 1, _id: '123', type: 1, password: '123' }

const Template: Story = () => <Form customer={customer} />

export const Default = Template.bind({})
