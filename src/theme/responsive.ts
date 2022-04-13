import { css } from 'styled-components'

const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '1018px',
  lg: '1200px',
  xlg: '1440px',
}

interface BreakPoints {
  xs: string,
  sm: string,
  md: string,
  lg: string,
  xlg: string
}

export const mixins = Object.keys(breakpoints).reduce((accumulator: any, label: string) => {
  accumulator[label] = (...args: any) => css`
    @media (min-width: ${breakpoints[label as keyof BreakPoints]}) {
      ${({ theme }) => css(theme, ...args)};
    }
  `

  return accumulator
}, {})