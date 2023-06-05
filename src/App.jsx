import React, { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Chat from './components/Chat'

function App() {
  const [storage, setStorage] = useState(localStorage.getItem('user'))
  const [isLogged, setIsLogged] = useState(storage ? true : false)

  function handleStorage(e) {
    setStorage(e.newValue || '')
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return (
    <>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} storage={storage} />
      {isLogged ? <Chat /> : <Login setIsLogged={setIsLogged} />}
    </>
  )
}

export default App