import { useEffect, useState } from 'react';
import profile_photo from '../assets/website_assets/Profile_Photo.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getProfileMember } from '../features/MemberSlice';
import { getBalance } from '../features/TransactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '../utils/NumberFormatter';

function Header() {

    const dispatch = useDispatch();
    const getDataProfile = useSelector((state) => state.member)
    const { dataMember, loadingMember} = getDataProfile
    const getDataBalance = useSelector((state) => state.transaction)
    const { dataBalance, loadingBalance} = getDataBalance

    useEffect(()=>{
        if(!dataMember && !loadingMember){
            dispatch(getProfileMember())
        }

        if(!dataBalance && !loadingBalance){
            dispatch(getBalance())
        }
        
    }, [dispatch, dataMember, loadingMember, dataBalance, loadingBalance])
    
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const isImageExist = () => {
        const imgUrl = dataMember ? dataMember.data.profile_image : ''
        const parts = imgUrl?.split('/')
        const img = parts[parts.length - 1]
    
        if(img == 'null') {
            return false
        } else {
            return true
        }
    
    }
    // console.log(isImageExist())
    // console.log(dataMember)

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-5">
                    <div className="profile-photo mb-3">
                        <img style={{ borderRadius: '100%' }} src={
                            dataMember && isImageExist()
                            ? dataMember.data.profile_image  
                            : profile_photo  
                        } />
                        
                    </div>
                    <span style={{ fontSize: '1.1rem' }}>Selamat datang,</span>
                    {
                        dataMember 
                        ? <h3>{`${dataMember.data.first_name} ${dataMember.data.last_name}`}</h3>
                        : <h3>Kristianto Wibowo</h3>
                    }
                </div>
                <div className="col-md-7">
                    <div className="card text-light" style={{ backgroundColor: 'red' }}>
                        <div className="card-body d-flex flex-column">
                            <span>Saldo anda</span>
                            <div className='saldo-header'>
                                <label>Rp</label>
                                <input type={showPassword ? 'text' : 'password'} className="form-control text-light" value={
                                    dataBalance ? formatNumber(dataBalance.data.balance) : 0
                                } readOnly />
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