import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../features/InformationSlice"
import { useEffect } from "react"

function Services() {

    const dispatch = useDispatch()
    const { dataServices, loadingServices } = useSelector((state) => state.information)
    
    useEffect(()=>{
        dispatch(getServices())
    }, [dispatch])
    
    console.log(dataServices)

    return (
        <div className="container">
            <div className="row flex-nowrap overflow-auto my-4">
                {
                    dataServices &&
                        dataServices.data.map((item)=>(
                            <div className="col-2 col-md-1 col-sm-2 text-center">
                                <img src={item.service_icon} className="img-fluid" />
                                <div className="fw-lighter" style={{ fontSize:'0.8vw' }}>{item.service_name}</div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Services