import styled from 'styled-components';
import { convertPixelToRem } from 'css-blocks-styled-components';

export const Container = styled.header`
  background: ${({ theme }) => theme['gray-700']};
  padding: 2rem 0;
`;

export const Content = styled.div`
  display: flex;
  max-width: ${convertPixelToRem(1120)};
  margin: 0 auto;
  padding: 0 ${convertPixelToRem(15)};

  @media (max-width: 500px) {
    justify-content: center;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > span {
    font-weight: 700;
    font-size: ${convertPixelToRem(32)};

    color: ${({ theme }) => theme['blue-300']};
  }

  > h1 {
    font-family: 'Roboto Mono', monospace;
    font-size: ${convertPixelToRem(24)};
  }

  @media (max-width: 850px) {
    > span {
      font-size: ${convertPixelToRem(24)};
    }

    > h1 {
      font-size: ${convertPixelToRem(20)};
    }
  }
`;
