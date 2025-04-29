import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import ListContainer from '../components/ListContainer'

const Wrapper = styled.div`
  padding: 24px;
`
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`
const Btn = styled.button`
  padding: 10px 24px;
  border: none;
  background: ${props => (props.cancel ? '#ccc' : '#007bff')};
  color: ${props => (props.cancel ? '#333' : '#fff')};
  border-radius: 6px;
  margin: 0 8px;
  cursor: pointer;
`

export default function ListCreationView({
  lists = [],        // flat array of items from API
  modeIds = [],      // array of two selected list_numbers (1,2 or 3)
  onCancel,
  onUpdate,
}) {
  const [cols, setCols] = useState([])

  useEffect(() => {
    const [firstNum, secondNum] = modeIds
    if (lists.length === 0 || modeIds.length !== 2) return

    // group items by their list_number
    const grouped = { 1: [], 2: [], 3: [] }
    lists.forEach(item => {
      const listNum = item.list_number
      if (grouped[listNum]) grouped[listNum].push({
        id:        item.id,
        name:      item.name,
        desc:      item.description,
        direction: 'right',
      })
    })

    // build three columns: left, new, right
    const leftCol = {
      id:    firstNum,
      title: `List ${firstNum}`,
      items: grouped[firstNum],
    }
    const centerCol = {
      id:    'new',
      title: 'New List (0)',
      items: [],
    }
    const rightCol = {
      id:    secondNum,
      title: `List ${secondNum}`,
      items: grouped[secondNum],
    }

    setCols([leftCol, centerCol, rightCol])
  }, [lists, modeIds])

  const move = (itemId, dir) => {
    setCols(prev => {
      const copy = [...prev]
      const fromIndex = dir === 'right' ? 0 : dir === 'left' ? 2 : 1
      const toIndex = dir === 'right' ? 1 : dir === 'left' ? 1 : (dir === 'both' && copy[1].items.some(i => i.id === itemId) ? 2 : 0)
      const item = copy[fromIndex].items.find(i => i.id === itemId)
      if (!item) return copy
      copy[fromIndex].items = copy[fromIndex].items.filter(i => i.id !== itemId)
      item.direction = fromIndex < toIndex ? 'left' : 'right'
      copy[toIndex].items = [item, ...copy[toIndex].items]
      if (copy[1].id === 'new') {
        copy[1].title = `New List (${copy[1].items.length})`
      }
      return copy
    })
  }

  return (
    <>
      <Header onCreate={() => {}} />
      <Wrapper>
        <Flex>
          {cols.map(col => (
            <ListContainer
              key={col.id}
              title={col.title}
              items={col.items.map(item => ({
                ...item,
                direction:
                  col.id === 'new'
                    ? item.direction
                    : col === cols[0]
                    ? 'right'
                    : 'left',
              }))}
              onMove={move}
            />
          ))}
        </Flex>
        <Controls>
          <Btn cancel onClick={onCancel}>Cancel</Btn>
          <Btn onClick={() => onUpdate(cols)}>Update</Btn>
        </Controls>
      </Wrapper>
    </>
  )
}