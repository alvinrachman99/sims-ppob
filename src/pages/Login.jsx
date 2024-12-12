import { useRef, useState } from 'react';
import illustrasi_login_picture from '../assets/website_assets/Illustrasi_Login.png'
import logo from '../assets/website_assets/Logo.png'
import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';

function Login() {

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const [errLogin, setErrLogin] = useState('')

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!loginUser.email) {
      formErrors.email = 'email harus di isi';
      isValid = false;
    } else if(!/\S+@\S+\.\S+/.test(loginUser.email)) {
      formErrors.email = 'email tidak valid';
      isValid = false;
    }

    if (!loginUser.password) {
      formErrors.password = 'password harus di isi';
      isValid = false;
    } else if(loginUser.password.length < 8) {
      formErrors.password = 'password harus setidaknya mempunyai 8 karakter';
      isValid = false;
    }

    setErrors(formErrors);  // Set errors to state

    // Autofokus pada kolom pertama yang memiliki error
    if (!isValid) {
      for (let field in formErrors) {
        if (formErrors[field] && inputRefs[field]?.current) {
          inputRefs[field].current.focus();
          break;
        }
      }
    }

    return isValid;
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginUser({
      ...loginUser,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!validateForm()) return;
    
    if (loading) return;

    try {
      const result = await dispatch(login(loginUser));
      // console.log('result:')
      // console.log(result)
      if(result.payload.token){
        navigate('/'); // Navigasi ke Home jika sukses
      } else {
        setErrLogin(result.payload.message)
      }

    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">

        {/* Kolom untuk Form Input */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h4 className="text-center mb-4"><img src={logo}></img> SIMS PPOB</h4>
            <h3 className="text-center mb-4">Masuk atau buat akun untuk memulai</h3>
            <form onSubmit={(handleSubmit)}>
              <div className="mb-4 position-relative">
                <MdOutlineAlternateEmail 
                    style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        marginLeft: '1rem',
                        fontSize: '1rem',
                        color: errors.email ? 'red' : '#6c757d',
                    }} 
                />
                <input type="text" ref={inputRefs.email} value={loginUser.email} onChange={handleChange} className={`form-control ${errors.email ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="email" placeholder="masukan email anda" />
                {errors.email && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>
              <div className="mb-4 position-relative">
                <MdOutlineLock 
                    style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        marginLeft: '1rem',
                        fontSize: '1rem',
                        color: errors.password ? 'red' : '#6c757d',
                    }} 
                />
                <input type="password" ref={inputRefs.password} value={loginUser.password} onChange={handleChange} className={`form-control ${errors.password ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="password" placeholder="masukan password anda" />
                {errors.password && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.password}</span>}
                </div>
                <div className="mb-4">
                    <button type="submit" disabled={loading} className="btn btn-danger w-100">{loading ? 'Masuk...' : 'Masuk'}</button>
                    {error && <div>Error: {error}</div>}
                    </div>
                <div className='text-center'>
                    belum punya akun? registrasi <Link to="/register" className='disini'>di sini</Link>
                </div>
            </form>

          </div>
          <div className="w-50" style={{ position: 'absolute', bottom : '5%', padding: '0 5%' }}>
            {errLogin && 
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {errLogin}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
          </div>
        </div>

        {/* Kolom untuk Gambar */}
        <div className="col-md-6 d-none d-md-block">
          <div
            style={{
              backgroundImage: `url(${illustrasi_login_picture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default Login