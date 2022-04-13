import React, { Suspense } from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider as ThemeStyledProvider } from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.min.css'

import { FullpageSpinner } from './components/FullpageSpinner'
import { AppProvider } from './hooks'
import { RoutesApp } from './routes/RoutesApp'
import { ginfotechTheme } from './theme'
import { themeStyled } from './theme/styledTheme'

export const App: React.FC = () => {
  const methods = useForm()
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={ginfotechTheme}>
            <ThemeStyledProvider theme={themeStyled}>
              <BrowserRouter>
                <Suspense fallback={<FullpageSpinner />}>
                  <FormProvider {...methods} >
                    <RoutesApp />
                    <ToastContainer />
                  </FormProvider>
                </Suspense>
              </BrowserRouter>
            </ThemeStyledProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
