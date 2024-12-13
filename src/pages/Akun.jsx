import Navbar from '../components/Navbar';
import profile_photo from '../assets/website_assets/Profile_Photo.png';
import { FaPencilAlt, FaPray, FaRegUser } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getProfileMember, updateProfileImage } from '../features/MemberSlice';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../features/AuthSlice'
import { useNavigate } from 'react-router-dom';

function Akun() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { dataMember, loadingMember } = useSelector((state) => state.member);
  const [form, setForm] = useState(0); // 0 = edit, 1 = simpan

  useEffect(() => {
    if (!dataMember && !loadingMember) {
      dispatch(getProfileMember());
    }
  }, [dispatch, dataMember, loadingMember]);

  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
  });

  const inputRefs = {
    first_name: useRef(null),
    last_name: useRef(null),
  };

  useEffect(() => {
    if (dataMember && !loadingMember) {
      setProfile({
        email: dataMember.data.email,
        first_name: dataMember.data.first_name,
        last_name: dataMember.data.last_name,
      });
    }
  }, [dataMember, loadingMember]);

  console.log(dataMember)

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!profile.first_name) {
      formErrors.first_name = 'Nama depan harus diisi';
      isValid = false;
    }

    if (!profile.last_name) {
      formErrors.last_name = 'Nama belakang harus diisi';
      isValid = false;
    }

    setErrors(formErrors); // Set errors to state

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
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEditProfile = async () => {
    if (form === 0) {
      setForm(1);
    } else {
      setForm(0);
    }
  };

  const handleCancelEdit = () => {
    if (form === 0) {
      setForm(1);
    } else {
      setForm(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!validateForm()) return;

    if (loadingMember) return;

    try {
      await dispatch(updateProfile(profile)).unwrap();
      dispatch(getProfileMember());
      setForm(0); // set form jadi 0 == edit
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const inputFile = useRef(null);
  const clickInputFile = () => {
    inputFile.current.click();
  };

  const handleUpdateImage = (e) => {
    const file = e.target.files[0];
    // console.log('file:')
    // console.log(file)
    if (!file) return;

    // Validasi ukuran file (maksimum 100KB)
    const MAX_SIZE = 100 * 1024; // 100KB
    if (file.size > MAX_SIZE) {
      alert('Ukuran file maksimum adalah 100KB.');
      return;
    }

    // Validasi tipe file (hanya JPG, JPEG, PNG yang diperbolehkan)
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Hanya file JPG, JPEG, dan PNG yang diperbolehkan.');
      return;
    }

    dispatch(updateProfileImage(file));

    dispatch(getProfileMember())
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login') //logout
  };

  const cekProfileImage = () => {
    const imgUrl = dataMember ? dataMember.data.profile_image : ''
    const parts = imgUrl?.split('/')
    const img = parts[parts.length - 1]

    if(img == null) return true

    return false
  }

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <div className="row">
          <div className="col my-4">
            <div className="position-relative">
              <div
                style={{
                  position: 'absolute',
                  bottom: '3%',
                  right: '43%',
                  marginLeft: '1rem',
                  fontSize: '0.7rem',
                  padding: '5px',
                  border: '1px solid grey',
                  borderRadius: '100%',
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={clickInputFile}
              >
                <FaPencilAlt />
              </div>
              <img src={dataMember && cekProfileImage() ? dataMember.data.profile_image : profile_photo} alt="Profile" className='img-fluid' style={{ 
                width: '15%',
                height: '15%',
                borderRadius: '100%',
               }} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
          </div>
        </div>

        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 position-relative">
                <label className="text-start w-100 mb-2">Email</label>
                <MdOutlineAlternateEmail
                  style={{
                    position: 'absolute',
                    top: '70%',
                    left: '0',
                    transform: 'translateY(-50%)',
                    marginLeft: '1rem',
                    fontSize: '1rem',
                    color: '#6c757d',
                    cursor: 'pointer',
                  }}
                  onClick={clickInputFile} 
                />
                <input
                  type="file"
                  ref={inputFile}
                  accept="image/jpeg, image/png"
                  onChange={handleUpdateImage}
                  style={{ display: 'none' }} 
                />
                <input
                  type="text"
                  ref={inputRefs.email}
                  value={profile.email}
                  readOnly
                  className={`form-control ${errors.email ? 'custom-input-error' : ''}`}
                  style={{ paddingLeft: '2.5rem' }}
                  name="email"
                  placeholder="Masukan email anda"
                />
                {errors.email && (
                  <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="mb-4 mt-2 position-relative">
                <label className="text-start w-100 mb-2">Nama Depan</label>
                <FaRegUser
                  style={{
                    position: 'absolute',
                    top: '70%',
                    left: '0',
                    transform: 'translateY(-50%)',
                    marginLeft: '1rem',
                    fontSize: '1rem',
                    color: errors.first_name ? 'red' : '#6c757d',
                  }}
                />
                <input
                  type="text"
                  ref={inputRefs.first_name}
                  value={profile.first_name}
                  className={`form-control ${errors.first_name ? 'custom-input-error' : ''}`}
                  style={{ paddingLeft: '2.5rem' }}
                  name="first_name"
                  placeholder="Nama depan"
                  onChange={form === 1 ? handleChange : undefined}
                  readOnly={form === 0}
                />
                {errors.first_name && (
                  <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>
                    {errors.first_name}
                  </span>
                )}
              </div>
              <div className="mb-4 mt-2 position-relative">
                <label className="text-start w-100 mb-2">Nama Belakang</label>
                <FaRegUser
                  style={{
                    position: 'absolute',
                    top: '70%',
                    left: '0',
                    transform: 'translateY(-50%)',
                    marginLeft: '1rem',
                    fontSize: '1rem',
                    color: errors.last_name ? 'red' : '#6c757d',
                  }}
                />
                <input
                  type="text"
                  ref={inputRefs.last_name}
                  value={profile.last_name}
                  className={`form-control ${errors.last_name ? 'custom-input-error' : ''}`}
                  style={{ paddingLeft: '2.5rem' }}
                  name="last_name"
                  placeholder="Nama belakang"
                  onChange={form === 1 ? handleChange : undefined}
                  readOnly={form === 0}
                />
                {errors.last_name && (
                  <span style={{ color: 'red', float: 'right', fontSize: '0.8rem' }}>
                    {errors.last_name}
                  </span>
                )}
              </div>
              {form === 0 && (
                <>
                  <button type="button" className="btn btn-outline-danger w-100 my-2" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                  <button type="button" className="btn btn-danger w-100 my-2" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
              {form === 1 && (
                <>
                  <button type="button" className="btn btn-outline-danger w-100 my-2" onClick={handleCancelEdit}>
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    disabled={loadingMember}
                    className="btn btn-danger w-100"
                  >
                    {loadingMember ? 'Simpan...' : 'Simpan'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Akun;
