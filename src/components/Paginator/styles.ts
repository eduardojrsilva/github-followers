import styled from 'styled-components';

export const PaginatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 3rem;
  gap: 1rem;
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
    background: ${({ theme }) => theme['blue-500']};
    color: ${({ theme }) => theme.white};
  }
`;

export const HiddenPages = styled.span`
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
`;
