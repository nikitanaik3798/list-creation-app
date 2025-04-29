// src/App.js
import React, { useState, useEffect } from 'react'
import GlobalStyles from './styled/GlobalStyles'
import { STATUSES } from './constants'
import { fetchLists } from './services/api'
import Loader from './components/Loader'
import FailureView from './components/FailureView'
import AllListsView from './views/AllListsView'
import ListCreationView from './views/ListCreationView'

function App() {
  const [status, setStatus] = useState(STATUSES.LOADING)
  const [lists, setLists] = useState([])
  const [modeIds, setModeIds] = useState([])        // holds the two selected list-IDs
  const [isCreating, setIsCreating] = useState(false)

  const loadData = async () => {
    setStatus(STATUSES.LOADING)
    try {
      const data = await fetchLists()
      console.log('fetched →', data)
      setLists(data.lists)
      setStatus(STATUSES.SUCCESS)
    } catch {
      setStatus(STATUSES.FAILURE)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (status === STATUSES.LOADING) {
    return (
      <>
        <GlobalStyles />
        <Loader />
      </>
    )
  }
  if (status === STATUSES.FAILURE) {
    return (
      <>
        <GlobalStyles />
        <FailureView onRetry={loadData} />
      </>
    )
  }

  return (
    <>
      <GlobalStyles />
      {isCreating ? (
        <ListCreationView
          lists={lists}
          modeIds={modeIds}
          onCancel={() => setIsCreating(false)}
          onUpdate={(updatedCols) => {
            // Flatten updatedCols back into your lists shape
            const newLists = updatedCols.map(col => ({
              id: col.id,
              title: col.title,
              items: col.items.map(item => ({
                id: item.id,
                title: item.name,
                description: item.desc,
              })),
            }))
            setLists(newLists)
            setIsCreating(false)
          }}
        />
      ) : (
        <AllListsView
          lists={lists}
          onCreate={() => setIsCreating(true)}
          setModeLists={(ids) => setModeIds(ids)}
        />
      )}
    </>
  )
}

export default App
