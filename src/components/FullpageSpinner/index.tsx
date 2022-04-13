import { Grid, CircularProgress, GridProps } from '@mui/material'

export const FullpageSpinner: React.FC<GridProps> = (props) => (
  <Grid container alignItems='center' justifyContent='center' height='100%' {...props}>
    <CircularProgress />
  </Grid>
)
