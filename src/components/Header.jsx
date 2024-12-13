import React, { useEffect, useState } from 'react';
import profile_photo from '../assets/website_assets/Profile_Photo.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '../utils/NumberFormatter';
import { getProfileMember } from '../features/MemberSlice';
import { getBalance } from '../features/TransactionSlice'

function Header() {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const { dataMember } = useSelector((state) => state.member);
  const { dataBalance } = useSelector((state) => state.transaction);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
        dispatch(getProfileMember(token));
        dispatch(getBalance(token));
    }
  }, [dispatch, token]);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const isImageExist = () => {
    const imgUrl = dataMember?.profile_image || '';
    const parts = imgUrl.split('/');
    return parts[parts.length - 1] !== 'null';
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-5">
          <div className="profile-photo mb-3">
            <img
              style={{ borderRadius: '100%' }}
              src={
                dataMember && isImageExist()
                  ? dataMember.profile_image
                  : profile_photo
              }
              alt="Profile"
            />
          </div>
          <span style={{ fontSize: '1.1rem' }}>Selamat datang,</span>
          {dataMember ? (
            <h3>{`${dataMember.first_name} ${dataMember.last_name}`}</h3>
          ) : (
            <h3>Kristianto Wibowo</h3>
          )}
        </div>
        <div className="col-md-7">
          <div className="card text-light" style={{ backgroundColor: 'red' }}>
            <div className="card-body d-flex flex-column">
              <span>Saldo anda</span>
              <div className="saldo-header">
                <label>Rp</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control text-light"
                  value={dataBalance ? formatNumber(dataBalance.balance) : 0}
                  readOnly
                />
              </div>
              <small>
                Lihat Saldo &nbsp;
                <span className="button-toggle-eye" onClick={handleTogglePassword}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
