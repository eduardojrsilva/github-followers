import styled from 'styled-components';
import { flex } from 'css-blocks-styled-components';

export const LoaderContainer = styled.div`
  ${flex.middle}
  margin-top: 2rem;
`;

export const Loading = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${({ theme }) => theme['blue-500']};
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme['blue-300']};
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }

  &:after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme['blue-700']};
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
