import styled, { css } from 'styled-components';
import { convertPixelToRem, flex } from 'css-blocks-styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: ${convertPixelToRem(1120)};
  margin: ${convertPixelToRem(30)} auto;
  padding: 0 ${convertPixelToRem(15)};
`;

export const Menu = styled.nav`
  ul {
    display: flex;
    gap: 3px;
  }
`;

interface MenuItemProps {
  $isActive: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
  list-style: none;
  border-radius: 10px 10px 0 0;

  button {
    background: transparent;
    color: inherit;
    border: 0;
    padding: 10px;
    box-shadow: none;
  }

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background: ${theme['gray-900']};
          color: ${theme['blue-500']};
        `
      : css`
          background: ${theme['gray-700']};

          :hover {
            transition: background-color 0.2s;
            background: ${theme['gray-600']};
          }
        `}
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-radius: 0 10px 10px;
  background: ${({ theme }) => theme['gray-900']};

  > span {
    margin: 1rem;
    text-align: center;
    color: ${({ theme }) => theme['gray-500']};
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme['gray-700']};
  border-radius: 10px;
  padding: 1rem;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  > a {
    background: ${({ theme }) => theme['gray-700']};
    border: 1px solid ${({ theme }) => theme['blue-500']};
    border-radius: 6px;
    padding: 5px 15px;

    color: ${({ theme }) => theme['blue-500']};
    text-transform: uppercase;
    font-family: 700 1rem 'Roboto Mono', monospace;

    :hover {
      transition: background-color 0.2s;
      background: ${({ theme }) => theme['blue-500']};
      color: ${({ theme }) => theme.white};
    }
  }
`;

export const NoUser = styled.div`
  ${flex.middle}
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;

  span {
    color: ${({ theme }) => theme['gray-500']};
    font-size: 1.5rem;
    font-family: 'Roboto Mono', monospace;
  }
`;
