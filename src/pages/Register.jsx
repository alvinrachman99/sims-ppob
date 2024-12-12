import illustrasi_login_picture from '../assets/website_assets/Illustrasi_Login.png'
import logo from '../assets/website_assets/Logo.png'
import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { registerMember } from '../features/MemberSlice';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate(); // Inisialisasi useNavigate
  const dispatch = useDispatch();
  const {loadingMember, errorMember} = useSelector((state) => state.member)

  const [register, setRegister] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    conf_password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    conf_password: "",
  })

  const inputRefs = {
    email: useRef(null),
    first_name: useRef(null),
    last_name: useRef(null),
    password: useRef(null),
    conf_password: useRef(null),
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!register.email) {
      formErrors.email = 'email harus di isi';
      isValid = false;
    } else if(!/\S+@\S+\.\S+/.test(register.email)) {
      formErrors.email = 'email tidak valid';
      isValid = false;
    }

    if (!register.first_name) {
      formErrors.first_name = 'nama depan harus di isi';
      isValid = false;
    }

    if (!register.last_name) {
      formErrors.last_name = 'nama belakang harus di isi';
      isValid = false;
    }

    if (!register.password) {
      formErrors.password = 'password harus di isi';
      isValid = false;
    } else if(register.password.length < 8) {
      formErrors.password = 'password harus setidaknya mempunyai 8 karakter';
      isValid = false;
    }

    if(!register.conf_password) {
      formErrors.conf_password = "konfirmasi password tidak boleh kosong"
      isValid = false;
    } else if(register.conf_password !== register.password) {
      formErrors.conf_password = "password tidak sama"
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegister({
      ...register,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi
    if (!validateForm()) return;
    
    if (loadingMember) return;

    // Buat salinan register tanpa confirm_password
    const { confirm_password, ...dataToSend } = register;

    try {
      const result = await dispatch(registerMember(dataToSend)).unwrap();
      // console.log('result:')
      // console.log(result)
      if(result.status === 0){
        navigate('/login'); // Navigasi jika sukses
      } else {
        if(result.status == 102){ // validasi email sudah terdaftar
          setErrors(prevErrors => ({
            ...prevErrors,
            email: result.message
          }));  // Set errors to state

          inputRefs['email'].current.focus();
        }
        console.error('Error:', result.message); // Tangani error
      }
    } catch (error) {
      console.error('Error:', error); // Tangani error
    }
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">

        {/* Kolom untuk Form Input */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h4 className="text-center mb-4"><img src={logo}></img> SIMS PPOB</h4>
            <h3 className="text-center mb-4">Lengkapi data untuk membuat akun</h3>
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
                    <input type="text" ref={inputRefs.email} value={register.email} onChange={handleChange} className={`form-control ${errors.email ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="email" placeholder="masukan email anda" />
                    {errors.email && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>
                <div className="mb-4 position-relative">
                    <FaRegUser 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: errors.first_name ? 'red' : '#6c757d',
                        }} 
                    />
                    <input type="text" ref={inputRefs.first_name} value={register.first_name} onChange={handleChange} className={`form-control ${errors.first_name ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="first_name" placeholder="nama depan" />
                    {errors.first_name && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.first_name}</span>}
                </div>
                <div className="mb-4 position-relative">
                    <FaRegUser 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: errors.last_name ? 'red' : '#6c757d',
                        }} 
                    />
                    <input type="text" ref={inputRefs.last_name} value={register.last_name} onChange={handleChange} className={`form-control ${errors.last_name ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="last_name" placeholder="nama belakang" />
                    {errors.last_name && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.last_name}</span>}
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
                    <input type="password" ref={inputRefs.password} value={register.password} onChange={handleChange} className={`form-control ${errors.password ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="password" placeholder="buat password" />
                    {errors.password && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.password}</span>}
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
                            color: errors.conf_password ? 'red' : '#6c757d',
                        }} 
                    />
                    <input type="password" ref={inputRefs.conf_password} value={register.conf_password} onChange={handleChange} className={`form-control ${errors.conf_password ? 'custom-input-error' : ''}`} style={{ paddingLeft: '2.5rem' }} name="conf_password" placeholder="konfirmasi password" />
                    {errors.conf_password && <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>{errors.conf_password}</span>}
                </div>
                <div className="mb-4">
                    <button type="submit" disabled={loadingMember} className="btn btn-danger w-100">{loadingMember ? 'Registrasi...' : 'Registrasi'}</button>
                    {errorMember && <div>Error: {errorMember}</div>}
                </div>
                <div className='text-center'>
                    sudah punya akun? login <Link to="/login" className='disini'>di sini</Link>
                </div>
            </form>
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

export default Register