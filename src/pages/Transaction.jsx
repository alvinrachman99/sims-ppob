import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { getTransaction } from '../features/TransactionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/NumberFormatter'
import { formatingDate } from '../utils/DateFormatter'

function Transaction() {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch()
  const { dataTransaction, loadingTransaction } = useSelector((state) => state.transaction)

  const [limit, setLimit] = useState(3)
  const [sortedData, setSortedData] = useState([])
  const [showData, setShowData] = useState([]) 

  useEffect(() => {
    if(token){
      dispatch(getTransaction(token))
    }
  }, [dispatch, token])

  useEffect(() => {
    if (dataTransaction && !loadingTransaction) {
      const sorted = [...dataTransaction?.data?.records].sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
      setSortedData(sorted)

      setShowData(sorted.slice(0, limit))
    }
  }, [dataTransaction, loadingTransaction])

  const handleShowMore = () => {
    const nextLimit = limit + 3
    setShowData(sortedData.slice(0, nextLimit)) 
    setLimit(nextLimit) 
  }

  // console.log('showData:', showData)

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <h5>Nominal Top Up</h5>

        {
          showData.length === 0 && (
            <div className="row my-4">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body text-center text-secondary">
                    Maaf tidak ada histori transaksi untuk ditampilkan
                  </div>
                </div>
              </div>
            </div>
          ) 
        }

        {
          showData.map((item, i) => (
            <div className="row my-4" key={i}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 text-start" style={{ color: item.transaction_type == 'TOPUP' ? 'green' : 'red', fontSize: '1.3rem', fontWeight: '600' }}>
                        {`${item.transaction_type == 'TOPUP' ? '+' : '-' } Rp.${formatNumber(item.total_amount)}`}
                      </div>
                      <div className="col-6 text-end" style={{ fontSize: '0.8rem' }}>{item.description}</div>
                    </div>
                    <div className="row">
                      <div className="col-6 text-start text-secondary" style={{ fontSize: '0.7rem' }}>{`${formatingDate(item.created_on)} WIB`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

        {
          limit < sortedData.length && (
            <div className="row mb-4">
              <div className="col text-center">
                <button className="btn btn-outline-danger mt-3" onClick={handleShowMore}>
                  Show More
                </button>
              </div>
            </div>
          )
        }

      </div>
    </>
  )
}

export default Transaction
