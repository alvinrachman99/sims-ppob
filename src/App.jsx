import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { validateToken } from './utils/ValidateToken';
import { useEffect } from 'react';
import TopUp from './pages/TopUp';
import Transaction from './pages/Transaction';
import Akun from './pages/Akun';
import ServicePage from './pages/ServicePage';

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

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/topup' element={<TopUp />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/akun' element={<Akun />} />
          <Route path='/service/:code' element={<ServicePage />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App