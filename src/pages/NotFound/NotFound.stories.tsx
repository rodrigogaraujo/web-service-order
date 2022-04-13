import { Story, Meta } from '@storybook/react'
import { NotFound } from './'

export default {
  title: 'Pages/NotFound',
  component: NotFound
} as Meta

const Template: Story = () => <NotFound />

export const Default = Template.bind({})
