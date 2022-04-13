import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material'
import { ThemeProvider as ThemeStyledProvider } from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import '../src/assets/fonts/FontFace.css'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'

import { ginfotechTheme } from '../src/theme'
import { themeStyled } from '../src/theme/styledTheme'
import { AppProvider } from '../src/hooks'

export const decorators = [
  (Story) => {
    const methods = useForm();

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={ginfotechTheme}>
          <ThemeStyledProvider theme={themeStyled}>
            <AppProvider>
              <BrowserRouter>
                <FormProvider {...methods} >
                  <CssBaseline />
                  <Story />
                </FormProvider>
              </BrowserRouter>
            </AppProvider>
          </ThemeStyledProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    )
  },
]