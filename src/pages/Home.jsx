import React from 'react'
import { logout } from '../features/authSlice'
import { useDispatch } from 'react-redux'

function Home() {

  const dispatch = useDispatch()
  
  const t = localStorage.getItem('token')
  console.log(t)
  const handleLogout = () => {
    const result = dispatch(logout());
    console.log(result)
    console.log(t)
  };

  return (
    <div>
      Home
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home