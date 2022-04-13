import { PublicLayout } from '.'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Components/Layout',
  component: PublicLayout,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const Template: Story = () => {
  return (
    <PublicLayout>
      <h1>Sign</h1>
      <h1>View</h1>
    </PublicLayout>
  )
}

export const Default = Template.bind({})

export const Authenticated = Template.bind({})
Authenticated.decorators = [
  (Story) => {
    return (
      <Story />
    )
  }
]
