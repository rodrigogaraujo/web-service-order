import { colors } from './colors'

export const themeStyled = {
  palette: {
    common: {
      white: colors.ui.white,
      black: colors.ui.black
    },
    primary: {
      main: colors.primary.green,
      light: '#EBF4FE'
    },
    secondary: {
      main: colors.primary.red
    },
    error: {
      main: colors.feedback.error.dark,
      light: colors.feedback.error.light,
      dark: colors.feedback.error.darker
    },
    success: {
      main: colors.feedback.success.dark,
      light: colors.feedback.success.light,
      dark: colors.feedback.success.darker
    },
    warning: {
      main: colors.feedback.warning.dark,
      light: colors.feedback.warning.light,
      dark: colors.feedback.warning.darker
    },
    info: {
      main: colors.feedback.notice.dark,
      light: colors.feedback.notice.light,
      dark: colors.feedback.notice.darker
    },
    text: {
      primary: colors.text.black,
      secondary: colors.text.gray1,
      disabled: colors.text.gray3,
    },
    background: {
      default: colors.ui.white,
      paper: colors.ui.lightGray,
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: 'rgba(0, 0, 0, 0.30)',
    },
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontWeight: 'normal',
      fontFamily: 'Inter Bold',
      fontSize: 65
    },
    h2: {
      fontWeight: 'normal',
      fontFamily: 'Inter Bold',
      fontSize: 40
    },
    h3: {
      fontWeight: 'normal',
      fontFamily: 'Inter Bold',
      fontSize: 28
    },
    h4: {
      fontWeight: 'normal',
      fontFamily: 'Inter Bold',
      fontSize: 28
    },
    h5: {
      fontWeight: 'normal',
      fontFamily: 'Inter Bold',
      fontSize: 22
    },
    h6: {
      fontFamily: 'Inter Medium',
      fontSize: 18
    },
    body1: {
      fontSize: 16,
      fontFamily: 'Inter'
    },
    body2: {
      fontSize: 16,
      fontFamily: 'Inter',
    },
    button: {
      fontSize: 16,
      fontFamily: 'Inter Bold',
      textTransform: 'none',
      borderRadius: 8
    },
    subtitle1: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 18,
      fontFamily: 'Inter Bold'
    },
    caption: {
      fontSize: 16
    }
  },
  shape: {
    borderRadius: 8
  },
  mixins: {
    toolbar: {
      minHeight: 80
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '16px 24px'
        },
        sizeSmall: {
          padding: '8px 16px'
        }
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          color: colors.text.black
        },
        standardError: {
          border: `1px solid ${colors.feedback.error.light}`,
          backgroundColor: colors.feedback.error.lighter,
          '& .MuiAlert-icon': {
            color: colors.feedback.error.dark
          },
          '& .MuiAlertTitle-root': {
            color: colors.feedback.error.darker
          }
        },
        standardSuccess: {
          border: `1px solid ${colors.feedback.success.light}`,
          backgroundColor: colors.feedback.success.lighter,
          '& .MuiAlert-icon': {
            color: colors.feedback.success.dark
          },
          '& .MuiAlertTitle-root': {
            color: colors.feedback.success.darker
          }
        },
        standardInfo: {
          border: `1px solid ${colors.feedback.notice.light}`,
          backgroundColor: colors.feedback.notice.lighter,
          '& .MuiAlert-icon': {
            color: colors.feedback.notice.dark
          },
          '& .MuiAlertTitle-root': {
            color: colors.feedback.notice.darker
          }
        },
        standardWarning: {
          border: `1px solid ${colors.feedback.warning.light}`,
          backgroundColor: colors.feedback.warning.lighter,
          '& .MuiAlert-icon': {
            color: colors.feedback.warning.dark
          },
          '& .MuiAlertTitle-root': {
            color: colors.feedback.warning.darker
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 16
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px 16px'
        }
      }
    }
  }
}