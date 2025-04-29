import React, { useState } from 'react'
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
const Check = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  pointer-events: none;
`
const ListWrapper = styled.div`
  position: relative;
  margin: 8px;
  cursor: pointer;
`
const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 12px;
`

export default function AllListsView({
  lists = [],        // raw items array from API
  onCreate,
  setModeLists,
}) {
  const [selected, setSelected] = useState([])
  const [err, setErr] = useState('')

  // Group items into three lists based on list_number
  const grouped = { 1: [], 2: [], 3: [] }
  lists.forEach(item => {
    const bucket = grouped[item.list_number]
    if (bucket) bucket.push({
      id:        item.id,
      name:      item.name,
      desc:      item.description,
      direction: 'right',
    })
  })

  const containers = [1, 2, 3].map(n => ({
    id:    n,
    title: `List ${n}`,
    items: grouped[n],
  }))

  const toggle = id => {
    setErr('')
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    )
  }

  const handleCreate = () => {
    if (selected.length !== 2) {
      setErr('You should select exactly 2 lists to create a new list')
      return
    }
    setModeLists(selected)
    onCreate()
  }

  return (
    <>
      <Header onCreate={handleCreate} />
      <Wrapper>
        <Flex>
          {containers.map(container => (
            <ListWrapper
              key={container.id}
              onClick={() => toggle(container.id)}
            >
              <ListContainer
                title={container.title}
                items={container.items}
                onMove={() => {}}
              />
              {selected.includes(container.id) && <Check>✔</Check>}
            </ListWrapper>
          ))}
        </Flex>
        {err && <Error>{err}</Error>}
      </Wrapper>
    </>
  )
}