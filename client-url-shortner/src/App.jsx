// import { useState } from 'react'
import { getItem } from './utils/Store.jsx'
import { useNavigate } from 'react-router'
function App() {
  const navigate = useNavigate()

  if (!getItem('token')) {
    navigate('/signin')
  } else {
    navigate('/dashboard')
  }

  return (
    <>
      <section id="center">
        <h1 className='text-2xl'>Home</h1>
      </section>
    </>
  )
}

export default App
