import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 80px;
`;
const Msg = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
`;
const Retry = styled.button`
  background: none;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover { background: #f0f8ff; }
`;

export default function FailureView({ onRetry }) {
  return (
    <Container>
      <Msg>Oops! Something went wrong.</Msg>
      <Retry onClick={onRetry}>Try Again</Retry>
    </Container>
  );
}