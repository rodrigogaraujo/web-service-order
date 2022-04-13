import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from '@mui/material'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'text', 'outlined'],
      defaultValue: 'contained',
      control: { type: 'radio' }
    },
    color: {
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      defaultValue: 'primary',
      control: { type: 'radio' }
    }
  }
} as Meta

export const Default: Story<ButtonProps> = (args) => (
  <Button {...args}>
    Botão
  </Button>
)
