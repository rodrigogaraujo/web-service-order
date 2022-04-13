import styled, { css } from 'styled-components'
import { mixins } from '../../theme/responsive'

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;

    svg {
        position: relative;
        width: 65px;
        height: 65px;
    }
`

export const Form = styled.form`
    .auth-button {
        width: 160px;
        background-color: ${({ theme }) => theme.palette.primary.main};

        :hover {
            opacity: 3;
            background-color: ${({ theme }) => theme.palette.primary.main};
        }
    }

    .auth-input {
        margin: 15px 0;
    }
`
export const BottomButtonWrapper = styled.div`
    ${mixins.sm(css`
        margin-top: 30px;
    `)}

    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.auth-only-link {
        place-content: center;
    }
`

export const Link = styled.a`
  font-size: ${({ theme }) => theme.typography.body1.fontSize}px;
  color: ${({ theme }) => theme.palette.primary.main};
`

export const TitleWrapper = styled.div`
    display: flex;
    margin: 25px 0;

    border-bottom: 1px solid #DEE2E6;
    padding-bottom: 16px;

    &.auth-title-subtitle {
        display: block;
    }
`

export const ResetWrapper = styled.div`
    .auth-success-box {
        height: 102px;

        margin-top: 16px;
        padding: 10px;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.palette.success.light};
        color: ${({ theme }) => theme.palette.success.main};

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`