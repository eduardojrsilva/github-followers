import React from 'react';
import { convertPixelToRem } from 'css-blocks-styled-components';

import { theme } from '../../styles/theme';

interface ReactSelectStyleProps {
  background: string;
  borderColor: string;
  width: string;
  color: string;
  marginLeft?: string;
}

export function getReactSelectStyle({
  background,
  borderColor,
  width,
  color,
  marginLeft = '0',
}: ReactSelectStyleProps): any {
  const style = {
    control: (styles: React.CSSProperties) => ({
      ...styles,
      background,
      borderRadius: '50px',
      borderColor,
      fontSize: convertPixelToRem(12),
      width,
      minHeight: convertPixelToRem(25),
      marginLeft,
    }),
    singleValue: (styles: React.CSSProperties) => ({
      ...styles,
      color,
      justifySelf: 'center',
    }),
    indicatorSeparator: (styles: React.CSSProperties) => ({
      ...styles,
      display: 'none',
    }),
    dropdownIndicator: (styles: React.CSSProperties) => ({
      ...styles,
      color,
      padding: '0',
      paddingRight: '8px',
    }),
    menu: (styles: React.CSSProperties) => ({
      ...styles,
      fontSize: convertPixelToRem(12),
      margin: '0',
      borderRadius: '10px',
      color,
      background: theme['gray-800'],
    }),
  };

  return style;
}
