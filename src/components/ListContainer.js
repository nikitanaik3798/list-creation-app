import styled from 'styled-components';
import React from 'react';
import ListItem from './ListItem';

const Section = styled.div`
  background: #f0f6ff;
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  @media (max-width: 768px) { min-width: 100%; }
`;
const Header = styled.div`
  font-weight: 600;
  margin-bottom: 12px;
`;

export default function ListContainer({ title, items, onMove }) {
  return (
    <Section>
      <Header>{title}</Header>
      {items.map(item => (
        <ListItem key={item.id} item={item} onMove={onMove} />
      ))}
    </Section>
  );
}