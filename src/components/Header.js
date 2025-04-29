import styled from 'styled-components';
import React from 'react';

const Bar = styled.header`
  text-align: center;
  padding: 32px 16px 0;
`;
const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: 600;
`;
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background-color: #006ae6; }
`;

export default function Header({ onCreate }) {
  return (
    <Bar>
      <Title>List Creation</Title>
      <Button onClick={onCreate}>Create a new list</Button>
    </Bar>
  );
}