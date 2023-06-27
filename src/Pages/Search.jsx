import { useSearchParams } from "react-router-dom"
import Loading from "../Components/Loading"
import ProductCard from "../Components/ProductCard"
import { useQuery } from "react-query"
import axios from "axios"
import "./styles/ProductGrid.css"

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  
  const {data: searchProducts, isFetching} = useQuery(["searchProduct", query], async()=> {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)

    return response.data
  }, {
    staleTime: 400 * 60,
  })

  return (
    <div className="products-container">
      <h2 className="title query">Buscas para: {query}<span></span></h2>
      <div className="products-content">
        {isFetching && <Loading/>}
        {!isFetching && searchProducts.results.map((product) => <ProductCard key={product.id} product={product}/>)}
        </div>
    </div>
    );
}

export default Search;