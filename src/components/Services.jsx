import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../features/InformationSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function Services() {

    const dispatch = useDispatch()
    const { dataServices, loadingServices } = useSelector((state) => state.information)
    
    useEffect(()=>{
        if(!dataServices && !loadingServices){
            dispatch(getServices())
        }
    }, [dispatch, dataServices, loadingServices])
    
    return (
        <div className="container">
            <div className="row flex-nowrap overflow-auto my-4">
                {
                    dataServices &&
                        dataServices.data.map((item, i)=>(
                            <div className="col-2 col-md-1 col-sm-2 text-center" key={i}>
                                <Link to={`/service/${item.service_code}`}>
                                <img src={item.service_icon} className="img-fluid" />
                                </Link>
                                <div className="fw-lighter service-name">{item.service_name}</div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Services