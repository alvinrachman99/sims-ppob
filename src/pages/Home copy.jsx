import React from 'react'
import { logout } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home1() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const t = localStorage.getItem('token')

  const handleLogout = () => {
    const result = dispatch(logout());
    navigate('/login') //logout
  };

  return (
    <div>
      Home
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home1