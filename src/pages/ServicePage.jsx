import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { getServices } from "../features/InformationSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { formatInputNumber } from '../utils/NumberFormatter'
import { CiCreditCard1 } from "react-icons/ci";
import { getBalance, pembayaran } from '../features/TransactionSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import logo from '../assets/website_assets/Logo.png'

function ServicePage() {
    const code = useParams().code
    const [nominal, setNominal] = useState(0)
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { dataServices, loadingServices } = useSelector((state) => state.information)
    const { dataBalance } = useSelector((state) => state.transaction);
    const balance = dataBalance?.data?.balance

    useEffect(()=>{
        if(code && !dataServices && !loadingServices){
            dispatch(getServices())
        }
    }, [dispatch, code, dataServices, loadingServices])
    
    const dataByCode = dataServices?.data?.find((item) => item.service_code === code);

    useEffect(()=>{
        if(code && dataServices){
            setNominal(formatInputNumber(dataByCode.service_tariff))
        }
    }, [code, dataServices])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const rawNominal = parseFloat(nominal.replace(/,/g, ''));
        
        if (rawNominal > balance) {
            await MySwal.fire({
                title: 'Pembayaran Gagal',
                html: `Tidak dapat melakukan pembayaran, karena saldo tidak mencukupi.`,
                icon: 'error',
            })

            return
        };

        if (loadingServices) return;

        const modalConfirm = await MySwal.fire({
            title: 'Konfirmasi Pembayaran',
            html: `Apakah Anda yakin ingin melakukan pembayaran sebesar <p><h3>Rp. ${nominal} ?</h3></p>`,
            imageUrl: logo,  
            imageWidth: 100, 
            imageHeight: 100, 
            showCancelButton: true,
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Ya, Lanjutkan Pembayaran',
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
                const result = await dispatch(pembayaran({service_code: code})).unwrap();
                
                if(result.status === 0){
                    dispatch(getBalance())

                    const result = await MySwal.fire({
                        title: 'Pembayaran Berhasil',
                        html: `Pembayaran ${code} sebesar <p><h3>Rp. ${nominal}</h3></p>`,
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
                        title: 'Pembayaran Gagal',
                        html: `Pembayaran ${code} sebesar <p><h3>Rp. ${nominal}</h3></p>`,
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
            console.log('pembayaran dibatalkan')
        }
        
    };

    return (
        <>
            <Navbar />
            <Header />
            <div className="container">
                <span style={{ fontSize: '1.1rem' }}>Pembayaran</span>
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <img src={dataByCode ? dataByCode.service_icon : ''} className='mt-1' style={{ width: '30px', height: '30px' }} />
                        <h5 className='ms-2 mt-1'>{dataByCode ? dataByCode.service_name : ''}</h5>
                    </div>
                </div>
                <div className="row mt-5">
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
                            <input type="text" className='form-control' style={{ paddingLeft: '2.5rem' }} name="nominal" value={nominal} readOnly />
                        </div>
                        <button type="submit" className={`btn ${nominal ? 'btn-danger' : 'btn-secondary'} w-100`} disabled={!nominal}>Bayar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ServicePage