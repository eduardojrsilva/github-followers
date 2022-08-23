import styled from 'styled-components';
import { convertPixelToRem } from 'css-blocks-styled-components';

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: 20px;
  padding: 2rem;
  background: ${({ theme }) => theme['gray-700']};

  > img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  > div {
    display: flex;
    gap: 3rem;
    margin-top: 1rem;

    span {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: ${convertPixelToRem(14)};
    }
  }
`;
