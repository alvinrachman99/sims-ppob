import illustrasi_login_picture from '../assets/website_assets/Illustrasi_Login.png'
import logo from '../assets/website_assets/Logo.png'
import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

function Register() {
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">

        {/* Kolom untuk Form Input */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h4 className="text-center mb-4"><img src={logo}></img> SIMS PPOB</h4>
            <h3 className="text-center mb-4">Lengkapi data untuk membuat akun</h3>
            <form>
                <div className="mb-3 position-relative">
                    <MdOutlineAlternateEmail 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }} 
                    />
                    <input type="email" className="form-control" style={{ paddingLeft: '2.5rem' }} id="email" placeholder="masukan email anda" />
                </div>
                <div className="mb-3 position-relative">
                    <FaRegUser 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }} 
                    />
                    <input type="text" className="form-control" style={{ paddingLeft: '2.5rem' }} id="nama_depan" placeholder="nama depan" />
                </div>
                <div className="mb-3 position-relative">
                    <FaRegUser 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }} 
                    />
                    <input type="text" className="form-control" style={{ paddingLeft: '2.5rem' }} id="nama_belakang" placeholder="nama belakang" />
                </div>
                <div className="mb-3 position-relative">
                    <MdOutlineLock 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }} 
                    />
                    <input type="password" className="form-control" style={{ paddingLeft: '2.5rem' }} id="password" placeholder="buat password" />
                </div>
                <div className="mb-3 position-relative">
                    <MdOutlineLock 
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            marginLeft: '1rem',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }} 
                    />
                    <input type="password" className="form-control" style={{ paddingLeft: '2.5rem' }} id="conf_password" placeholder="konfirmasi password" />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-danger w-100">Registrasi</button>
                </div>
                <div className='text-center'>
                    sudah punya akun? login <a href="">di sini</a>
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