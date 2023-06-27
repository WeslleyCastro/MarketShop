import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import { useRef } from "react"
function CategoriesCarousel({categorie}) {
  const navigate = useNavigate()
  const carrouselContent = useRef()

  const { data, isLoading } = useQuery(["infoCategorie", categorie], async() => {
    const response = await axios.get(`https://api.mercadolibre.com/categories/${categorie.id}`)
    return response.data
  })

  
  const handleOnClick = () => {
    navigate(`category?categorie=${categorie.id}`)
  }

  const handleOnError = () => {
   carrouselContent.current.style.display="none"
  }
  
  return ( 
    <div className="carrousel-container">
      {!isLoading &&(
          <div ref={carrouselContent} onClick={handleOnClick} className="carrousel-content">
            <div className="carrousel-img">
              <img draggable="false" src={data.picture} alt={data.name} onError={handleOnError} />
            </div>
            <p>{data.name}</p>
          </div>
      )}
    </div>
   );
}

export default CategoriesCarousel;