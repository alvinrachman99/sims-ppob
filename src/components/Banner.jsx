import { useDispatch, useSelector } from "react-redux"
import { getBanner } from "../features/InformationSlice"
import { useEffect, useRef, useState } from "react"

function Banner() {

  const token = localStorage.getItem('token');
  const dispatch = useDispatch()
  const { dataBanner } = useSelector((state) => state.information)
  
  const [activeIndex, setActiveIndex] = useState(0);
  const tombolNextCarousel = useRef(null)
  
  useEffect(()=>{
      if(token){
        dispatch(getBanner(token))
      }
  }, [dispatch, token])

  const getItemsPerSlide = () => {
    const width = window.innerWidth;

    if (width >= 1200) return 4; 
    if (width >= 768) return 3;  
    if (width >= 576) return 2;  
    return 1;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    // Fungsi untuk menangani perubahan ukuran layar
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    // Menambahkan event listener untuk resize
    window.addEventListener('resize', handleResize);

    // Menghapus event listener saat komponen dibersihkan
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(activeIndex === 0){
        tombolNextCarousel.current.click();
        setActiveIndex(0)
      }
    }, 5000)

  }, [activeIndex])

  const slides = dataBanner ? Math.ceil(dataBanner.data.length / itemsPerSlide) : 1;

  return (
    <div className="container">
      <div className="row">
        <h6>Temukan promo menarik</h6>
      </div>
      <div className="row">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner">
            {/* Looping slide */}
            {
              dataBanner &&
              Array.from({ length: slides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}
                >
                  <div className="container">
                    <div className="row">
                      {/* Looping item */}
                      {

                        dataBanner.data.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((item, i) => (
                          <div key={i} className={`col-12 col-sm-${12 / itemsPerSlide} col-md-${12 / itemsPerSlide}`}>
                            <div className="card">
                              <img src={item.banner_image} className="card-img-top" alt={item.banner_name} />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Tombol navigasi */}
          <button
            className="carousel-control-prev"
            style={{ 
              width: '2.5%'
            }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            style={{ 
              width: '2.5%'
            }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            ref={tombolNextCarousel}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner