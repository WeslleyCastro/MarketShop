import { useRef } from "react"
import { GrFormPrevious, GrFormNext} from "react-icons/gr"
import banner1 from "../images/banner1.png"
import banner2 from "../images/banner2.png"
import CategoriesCarousel from "../Components/CategoriesCarousel"
import "./styles/Home.css"
import { useQuery } from "react-query"
import axios from "axios"
import CarouselProducts from "../Components/CarouselProducts"

function Home() {
  
  const category = useRef()

  const { data: iphones, isFetching: fetchingIphones} = useQuery("getIphones", async() => {
    const response = await axios.get("https://api.mercadolibre.com/sites/MLB/search?q=iphone")
    
    return response.data
  },{
    staleTime: 500 * 60, 
  })
  
  const { data: categories, isFetching: fetchingCategories} = useQuery("getCategories", async() => {
    const response = await axios.get("https://api.mercadolibre.com/sites/MLB/categories")

    return response.data
  },{
    staleTime: 500 * 60,
  })
 
  const { data: categorieProduct, isFetching: fetchingProduct} = useQuery("getProduct", async() => {
    const response = await axios.get("https://api.mercadolibre.com/sites/MLB/search?category=MLB1000")
    
    return response.data
  },{
    staleTime: 500 * 60, 
  })


  const handleLeftClick = (e) => {
    e.preventDefault() 
    category.current.scrollLeft -= category.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    category.current.scrollLeft += category.current.offsetWidth
  }

  return (
    <main>
      <div className="banner">
        <img src={banner1} alt="banner"/>
      </div>
      <div className="category-container">
        <h2>Escolha o que deseja por categoria!</h2>
        <div className="category-layout">
          <button id="category-left" onClick={(e) => handleLeftClick(e)}><GrFormPrevious/></button>
          <div className="category-content" ref={category}>
            {!fetchingCategories && categories.map((categorie) => (
              <CategoriesCarousel key={categorie.id} categorie={categorie}/>
           ))}
          </div>
          <button id="category-right" onClick={(e) => handleRightClick(e)}><GrFormNext/></button>
        </div>
      </div>

       <div className="banner-content">
          <div><img src={banner2} alt="banner"/></div>
       </div>

       {!fetchingIphones && <CarouselProducts carousel={iphones} title="Iphones em destaque"/>}

       {!fetchingProduct && <CarouselProducts carousel={categorieProduct} title="Acessórios e eletronicos"/>}
    </main>
  );
}

export default Home;