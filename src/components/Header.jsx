import { useEffect, useState } from 'react';
import profile_photo from '../assets/website_assets/Profile_Photo.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getProfileMember } from '../features/MemberSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.member)

    useEffect(()=>{
        dispatch(getProfileMember())
    }, [dispatch])

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-5">
                    <div className="profile-photo mb-3">
                        <img src={profile_photo} />
                    </div>
                    <span style={{ fontSize: '1.1rem' }}>Selamat datang,</span>
                    <h3>{`${user.data.first_name} ${user.data.last_name}`}</h3>
                </div>
                <div className="col-md-7">
                    <div className="card text-light" style={{ backgroundColor: 'red' }}>
                        <div className="card-body d-flex flex-column">
                            <span>Saldo anda</span>
                            <div className='saldo-header'>
                                <label>Rp</label>
                                <input type={showPassword ? 'text' : 'password'} className="form-control text-light" value="123456" readOnly />
                            </div>
                            <small>Lihat Saldo &nbsp;<span className='button-toggle-eye' onClick={handleTogglePassword}>{
                                showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                            }</span></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header