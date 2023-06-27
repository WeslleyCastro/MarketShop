import "./SelectImage.css"
import { useState } from "react"
function SelectImage({product}) {
  
  const [image, setImage] = useState(product.thumbnail)
  const handleOnHouver = (img) => {
      setImage(img)
    }
    
  return ( 
    <div className="container">
      <div className="image-container">
        {product.pictures.length < 8 && product.pictures.map((img) => (
          <div
            onMouseEnter={() => handleOnHouver(img.url)}
            className="image-content" 
            key={img.id}>
              <img src={img.url}/>
          </div>
        ))}
        {product.pictures.length > 7 && product.pictures.slice(0,7).map((img)=>(
          <div
          onMouseEnter={() => handleOnHouver(img.url)}
          className="image-content" 
          key={img.id}>
            <img src={img.url}/>
        </div>
        ))}

      </div>
      <div className="product-img">
        <img src={image.replace(/\w\.jpg/gi, "W.jpg")} alt="" />
      </div>
    </div>
   );
}

export default SelectImage;