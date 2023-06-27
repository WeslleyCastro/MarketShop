import { useNavigate, useParams } from "react-router-dom"
import { BiCheckCircle } from "react-icons/bi"
import { AiOutlineArrowDown } from "react-icons/ai"
import { useState } from "react"
import Loading from "../Components/Loading"
import "./styles/Product.css"
import { useMutation, useQuery } from "react-query"
import axios from "axios"

            //Images
import Hipercard from "../images/hipercard-logo.png"
import Elo from "../images/cartao-elo.png"
import Visa from "../images/visa-logo.png"
import Mastercard from "../images/mastercard-logo.png"
import Caixa from "../images/caixa.png"
import Boleto from "../images/Boleto.png"
import SelectImage from "../Components/SelectImage"
import formatCurrency from "../Utils/FormatCurrency"
import Message from "../Components/Message"
import CarouselProducts from "../Components/CarouselProducts"

function Product() {
  const {id} = useParams()

  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState(1)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const options = []

 
  const { data: product, isLoading} = useQuery(["product", id], async() => {
    const response = await axios.get(`https://api.mercadolibre.com/items/${id}`)
    return response.data
  }, {
    staleTime: 200 * 60, 
    cacheTime: 0,
  })


  const { data: categorieProduct, isLoading: isLoadingCategory} = useQuery(["productCategory", product], async() => {
    if(!isLoading){
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${product.category_id}`)
    return response.data
  }
  },{
    staleTime: 200 * 60, 
  })
  

  const handleOnSubmit= (e) => {
    e.preventDefault()
    setSelected(Number(e.target.elements.quantityValue.value))
    
    e.target.elements.quantityValue.value = ""
  }
   
  const { mutate, isSuccess: isSuccessPost} = useMutation("buyProduct", (product) => {
    axios.post("https://json-shopping.vercel.app/products", {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: selected,
      available_quantity: product.available_quantity
    })
    .then(() => setError(false))
    .catch((error) => setError(true))
  })
  
  const handleBuyProduct = (product) => {
    setError(null)
    mutate(product)
  }


  const handleBuyProductRedirect = (product) =>{
    handleBuyProduct(product)
    navigate("/cart")
  }

  const availableQuantity = () => {
    if(!isLoading)
    for(let i = 1; i <= product.available_quantity && i < 4; i++) {
      options.push(i)
    }
  }

  availableQuantity()
 

  return ( 
    <main className="product-main">
      {isLoading == true && <Loading/>}
      {isLoading == false && (
        <div className="product-container">
          <div className="select-image">
          <h2 className="title">{product.title}</h2>
          <SelectImage product={product}/>
        </div>
        <div className="production-description">
          <div className="info-list">
            <p>O que voce precisa saber Sobre o Produto:</p>
            <div className="list">
              {product.attributes.slice(1,9).map((info) => (
              <div key={info.id}>
                <h4>{info.name}:</h4>
                <p>{info.value_name}</p>
              </div>
              ))}
            </div>
          </div>
        </div>
        <div className="buy-product">
          <div className="price-value">
            <p className="price">{formatCurrency(product.price, "BRL")}</p>
              <small>em <span>10x {formatCurrency(product.price / 10, "BRL")}</span></small>
          </div>
          <div className="payment">
            <p>Cartões de crédito</p>
              <div id="credit">
                <img src={Hipercard} alt="hipercard"/>
                <img src={Elo} alt="elo" />
                <img src={Visa} alt="visa" />
                <img src={Mastercard} alt="mastercard" />
              </div>
            <p>Cartões de débito</p>
              <div id="debito">
                <img src={Caixa} alt="caixa"/>
              </div>
            <p>Boleto bancário</p>
              <div id="boleto">
                <img src={Boleto} alt="boleto" />
              </div>
          </div>
          <div className="storage">
            <p id="storage-stats">
              Estoque disponível<BiCheckCircle/> <small>{`(${product.available_quantity} disponíveis)`}</small>
            </p>
            <div className="select-quantity">
             <div className="dropdown">
                <div className="set-quantity" 
                onClick={() => options.length > 1 && setIsActive(!isActive)}>
                    {`${selected} unidades`}  
                    {!isActive && <AiOutlineArrowDown/>}
                    {isActive && <AiOutlineArrowDown style={{rotate: "180deg"}}/>}
                </div>
                {isActive && (
                  <div className="dropdown-content">
                    {options.map(option => (
                    <div onClick={() => 
                      {setSelected(option),
                      setIsActive(!isActive)}}
                      className="item" 
                      key={option}>
                      {`${option} unidades`}
                    </div>))}
                      {product.available_quantity > 3 && (
                        <div className="item"> 
                            <form onSubmit={handleOnSubmit}>
                              <input id="quantityValue" max={product.available_quantity} type="number"/>
                              <button type="submit">Enviar</button>
                            </form>
                        </div>)}
                  </div>)}
              </div>
            </div>
          </div>
          <div className="buy-buttons">
           <button 
              id="buy-now"
              onClick={() => handleBuyProductRedirect(product)}>Comprar agora
            </button>
           <button 
              id="add-to-cart" 
              onClick={() => handleBuyProduct(product)}>Adicionar ao carinho
            </button>
            
            {error == false && <Message type="success" msg="Adicionado ao carinho!"/>}
            {error && <Message type="error" msg="Produto já adicionado no carinho"/>}
        </div>
        </div>
      </div>
      )}
   {!isLoadingCategory && <CarouselProducts carousel={categorieProduct} title="Produtos relacionados"/>}
    </main>
   );
}

export default Product;