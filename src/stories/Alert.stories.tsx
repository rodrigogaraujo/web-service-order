import { Meta, Story } from '@storybook/react'
import { Alert, AlertProps, AlertTitle } from '@mui/material'

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    severity: {
      options: ['error', 'warning', 'info', 'success'],
      control: { type: 'radio' }
    }
  }
} as Meta

export const Default: Story<AlertProps> = (args) => (
  <Alert {...args}>
    <AlertTitle>Título</AlertTitle>
    Corpo
  </Alert>
)
