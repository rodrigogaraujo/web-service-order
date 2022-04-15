import { Story, Meta } from '@storybook/react'
import { Form } from '.'

export default {
  title: 'Components/Users/UserForm',
  component: Form
} as Meta

const user =  { id: 1, name: 'Snow', email: 'Jon', phone: '35', active: 1, _id: '123', type: 1, password: '123' }

const Template: Story = () => <Form user={user} />

export const Default = Template.bind({})
