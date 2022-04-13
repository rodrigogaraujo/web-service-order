
import { useFormContext, Controller } from 'react-hook-form'

import { TextField as MUITextField, TextFieldProps } from '@mui/material'

interface IProps {
  name: string
}

export default function TextField({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MUITextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  )
}
