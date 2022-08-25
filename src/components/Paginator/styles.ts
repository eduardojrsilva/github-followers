import { convertPixelToRem } from 'css-blocks-styled-components';
import styled from 'styled-components';

export const PaginatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 3rem;
  gap: 1rem;

  > strong {
    color: ${({ theme }) => theme['blue-300']};
    font-family: 'Roboto Mono', monospace;
    font-size: ${convertPixelToRem(14)};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    > div {
      display: flex;
    }

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  @media (max-width: 750px) {
    flex-direction: column;
    margin: 0 1rem;
  }
`;

export const Button = styled.button`
  border-radius: 50%;
  background: ${({ theme }) => theme['gray-800']};
  color: ${({ theme }) => theme['blue-500']};
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme['blue-500']};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme['gray-600']};
    border-color: ${({ theme }) => theme['blue-300']};
    color: ${({ theme }) => theme['blue-300']};
  }

  &:disabled {
    background: ${({ theme }) => theme['blue-300']};
    color: ${({ theme }) => theme.white};
  }

  @media (max-width: 400px) {
    width: 25px;
    height: 25px;
  }
`;

export const HiddenPages = styled.span`
  display: inline-block;
  text-align: center;
  width: 25px;
  height: 25px;
`;
