import React from 'react';
import styled, { keyframes } from 'styled-components';
const spin = keyframes`to { transform: rotate(360deg); }`;
const Spinner = styled.div`
  width: 48px; height: 48px;
  border: 6px solid #e0e0e0;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 100px auto;
`;
export default () => <Spinner />;