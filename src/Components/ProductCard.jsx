import formatCurrency from "../Utils/FormatCurrency";
import { Link } from "react-router-dom";

function ProductCard({product}) {
  return ( 
     <div className="card-container">
       <Link draggable="false" to={`/product/${product.id}`}>
       <img draggable="false" src={product.thumbnail.replace(/\w\.jpg/gi, "W.jpg")} alt={product.title}/>
        <div className="card-info">
          <p className="card-price">{formatCurrency(product.price, "BRL")}</p>
          <p className="card-title">{product.title.length > 35 ? product.title.slice(0, 35) + "..." : product.title}</p>
        </div>
        </Link>
      </div>
    
   );
}

export default ProductCard;