import { useSearchParams } from "react-router-dom"
import ProductCard from "../Components/ProductCard"
import Loading from "../Components/Loading"
import { useQuery } from "react-query"
import axios from "axios"
import "./styles/ProductGrid.css"


function Categorie() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("categorie")

  const { data, isLoading } = useQuery(["searchCategorie", query], async() => {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${query}`)
    return response.data
  })

  return (
    <div className="products-container">
      <h2 className="title query">Buscas para categoria selecionada</h2>
        <div className="products-content">
          {isLoading && <Loading/>}
          {!isLoading && data.results.map((product) => <ProductCard key={product.id} product={product}/>)}
        </div>
    </div>
    );
}

export default Categorie;