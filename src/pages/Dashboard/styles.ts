import styled from 'styled-components';
import { convertPixelToRem } from 'css-blocks-styled-components';

export const Content = styled.div`
  max-width: ${convertPixelToRem(1120)};
  margin: ${convertPixelToRem(30)} auto;
  padding: 0 ${convertPixelToRem(15)};
`;
