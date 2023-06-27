import "./CarouselProducts.css"
import { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ProductCard from "./ProductCard";


function CarouselProducts({carousel, title}) {

  const carouselRef = useRef(0)
  
        //function to carousel 
  const handleLeftClick = (e) => {
    e.preventDefault()
    if(carouselRef !== undefined) carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    if(carouselRef !== undefined)carouselRef.current.scrollLeft += carouselRef.current.offsetWidth 
  }

  return ( 
    <div className="carousel-layout">
     <h3><AiFillStar/>{title}</h3>
      <div className="carousel-container">
      <button id="left" onClick={(e) => handleLeftClick(e)}><GrFormPrevious/></button>
        <div className="carousel" ref={carouselRef}>
            {carousel !== undefined && carousel.results.map((product) => (
            <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        <button id="right" onClick={(e) => handleRightClick(e)}><GrFormNext/></button>
      </div>
   </div>
   );
}

export default CarouselProducts;