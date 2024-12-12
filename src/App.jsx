import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/privateRoute';
import { validateToken } from './utils/ValidateToken';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log({token})
    if (token && !validateToken(token)) {
      localStorage.removeItem('token'); // Hapus token yang sudah expired
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* <Route element={<PrivateRoute />}> */}
          <Route path='/' element={<Home />} />
        {/* </Route> */}
      
      </Routes>
    </BrowserRouter>
  )
}

export default App