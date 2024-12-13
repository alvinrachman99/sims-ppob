import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { CiCreditCard1 } from "react-icons/ci";
import { useState } from 'react';
import { formatInputNumber, formatNumber } from '../utils/NumberFormatter';
import { topUp, getBalance } from '../features/TransactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import logo from '../assets/website_assets/Logo.png'
import { useNavigate } from 'react-router-dom';

function TopUp() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal);
    const { loadingTopUp } = useSelector((state) => state.transaction)

    const [nominal, setNominal] = useState('');

    const handleChange = (e) => {
        const rawNumber = e.target.value.replace(/,/g, '');
        if (!isNaN(rawNumber)) {
            setNominal(formatInputNumber(rawNumber));
        }
    };

    const handleButtonNominal = (value) => {
        setNominal(formatInputNumber(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawNominal = parseFloat(nominal.replace(/,/g, ''));
        
        // Validasi
        if (rawNominal < 10000) {
            await MySwal.fire({
                title: 'Top Up Gagal',
                html: `Minimal Top Up sebesar ${formatNumber(10000)} `,
                icon: 'error',
            })
            return
        };

        if (rawNominal > 1000000) {
            await MySwal.fire({
                title: 'Top Up Gagal',
                html: `Maximal Top Up sebesar ${formatNumber(1000000)} `,
                icon: 'error',
            })
            return
        };
        
        if (loadingTopUp) return;

        const modalConfirm = await MySwal.fire({
            title: 'Konfirmasi Top-Up',
            html: `Apakah Anda yakin ingin melakukan top-up sebesar <p><h3>Rp. ${nominal} ?</h3></p>`,
            imageUrl: logo,  
            imageWidth: 100, 
            imageHeight: 100, 
            showCancelButton: true,
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Ya, Lanjutkan Top Up',
            reverseButtons: false,
            customClass: {
                popup: 'custom-modal-size', // Custom modal size
                actions: 'custom-modal-actions', // Custom button layout
                confirmButton: 'custom-confirm-button', // Optional styling
                cancelButton: 'custom-cancel-button', // Optional styling
            },
        });

        if(modalConfirm.isConfirmed){
            try {
                const result = await dispatch(topUp({top_up_amount: rawNominal})).unwrap();
                
                if(result.status === 0){
                    dispatch(getBalance())

                    const result = await MySwal.fire({
                        title: 'Top-Up Berhasil',
                        html: `Saldo Anda telah bertambah sebesar <p><h3>Rp. ${nominal}</h3></p>`,
                        icon: 'success',
                        confirmButtonText: 'Kembali ke beranda',
                        customClass: {
                            confirmButton: 'custom-confirm-button',
                        }
                    });
                    if(result.isConfirmed){
                        navigate('/')
                    }
                } else {
                    const result = await MySwal.fire({
                        title: 'Top-Up Gagal',
                        html: `Top Up sebesar <p><h3>Rp. ${nominal}</h3></p> gagal.`,
                        icon: 'error',
                        confirmButtonText: 'Coba Lagi',
                        customClass: {
                            confirmButton: 'Kembali ke beranda',
                        }
                    });
                    if(result.isConfirmed){
                        navigate('/')
                    }

                    console.error('Error:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('top up dibatalkan')
        }

    }

    return (
        <>
            <Navbar />
            <Header />
            <div className="container">
                <span style={{ fontSize: '1.1rem' }}>Silakan masukan</span>
                <h3>Nominal Top Up</h3>
                <div className="row mt-5">
                    <div className="col-md-7 mb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 position-relative">
                                <CiCreditCard1 
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
                                <input type="text" className='form-control' style={{ paddingLeft: '2.5rem' }} name="nominal" placeholder="masukan nominal Top Up" value={nominal} onChange={handleChange} />
                            </div>
                            <button type="submit" className={`btn ${nominal ? 'btn-danger' : 'btn-secondary'} w-100`} disabled={!nominal}>Top Up</button>
                        </form>
                    </div>
                    <div className="col-md-5 mb-4">
                        <div className="row g-1">
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(10000)}>Rp. 10.000</button>
                            </div>
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(20000)}>Rp. 20.000</button>
                            </div>
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(50000)}>Rp. 50.000</button>
                            </div>
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(100000)}>Rp. 100.000</button>
                            </div>
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(250000)}>Rp. 250.000</button>
                            </div>
                            <div className="col-md-4 col-4 my-2">
                                <button type='button' className='btn btn-outline-secondary w-100' onClick={() => handleButtonNominal(500000)}>Rp. 500.000</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopUp