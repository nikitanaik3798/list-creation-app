import styled from 'styled-components';
import React from 'react';

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.div`
  flex: 1;
`;
const Name = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;
const Desc = styled.div`font-size: 0.9rem; color: #555;`;
const Arrow = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default function ListItem({ item, onMove }) {
  return (
    <Card>
      <Text>
        <Name>{item.name}</Name>
        <Desc>{item.desc}</Desc>
      </Text>
      <Arrow
        src={item.direction === 'right' ? '/right-arrow.svg' : '/left-arrow.svg'}
        onClick={() => onMove(item.id, item.direction)}
      />
    </Card>
  );
}