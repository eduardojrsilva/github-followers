import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;

    :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${({ theme }) => theme['blue-500']};
    }
  }

  #root {
    isolation: isolate;
  }

  @media(max-width: 960px) {
    html {
      font-size: 93.75%; // 15px
    }
  }

  @media(max-width: 600px) {
    html {
      font-size: 87.5%; // 14px
    }
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme['gray-800']};
    color: ${({ theme }) => theme['gray-100']};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a,
  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
