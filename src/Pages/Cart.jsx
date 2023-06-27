import "./styles/Cart.css"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import formatCurrency from "../Utils/FormatCurrency";
import { Link, useNavigate} from "react-router-dom";
import { RiShoppingBasket2Line } from "react-icons/ri"
import { TbMapPinFilled } from "react-icons/tb"
import { useState, useEffect} from "react"
import Loading from "../Components/Loading";

function Cart() {
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState("")
  const [addressData, setAddressData] = useState()
  const navigate = useNavigate()

  //get data products from json
  const { data: products, isLoading} = useQuery("product", async() => {
    const response = await axios.get(`https://json-shopping.vercel.app/products`)
    return response.data 
  }, {
    staleTime: 5000,
  })


  //delete product with click on "excluir"
  const client = useQueryClient()

  const deleteMutation = useMutation((id) => {
    axios.delete(`https://json-shopping.vercel.app/products/${id}`)
  },{
    onSuccess: () => {client.invalidateQueries("product")},
    onError: () => {console.log("Error!")}
  })

  const deleteProduct = (id) => {
    deleteMutation.mutate(id)
  }


  //add or remove quantity 
  const previousQuantityMutate = useMutation((product) => {
    axios.patch(`https://json-shopping.vercel.app/products/${product.id}`, {
      quantity: product.quantity - 1
    })
  }, {
    onSuccess: () => {client.invalidateQueries("product")},
    onError: () => {console.log("Error!")}
  })

  const previousQuantity = (product) => {
    if(product.quantity == 1) return
    previousQuantityMutate.mutate(product)
  }

  const nextQuantityMutate = useMutation((product) => {
    axios.patch(`https://json-shopping.vercel.app/products/${product.id}`, {
      quantity: product.quantity + 1
    })
  }, {
    onSuccess: () => {client.invalidateQueries("product")},
    onError: () => {console.log("Error!")}
  })

  const nextQuantity = (product) => {
    if(product.quantity == product.available_quantity) return 
    
    nextQuantityMutate.mutate(product)
  }


  //get address 
  const handleAdressSubmit = (e) => {
    e.preventDefault()
    if(address == "") return

    axios.get(`https://viacep.com.br/ws/${address}/json/`)
    .then(response => setAddressData(response.data))
    .catch(() => setAddressData("error"))
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }


  //send products to payment 
  const handlePaymentProducts = () => {
    
    if(products.length <= 0 || address == "") return
    navigate("/payment")
    handlePaymentProductsMutate.mutate(products)
  }

  const handlePaymentProductsMutate = useMutation((products) => {
    axios.post(`https://json-shopping.vercel.app/payment/`, {
      products,
      total: total,
      bairro: addressData.bairro,
      localidade: addressData.localidade,
      uf: addressData.uf
    })
  })

  useEffect(() => {
   if(products) {
      const calculatedTotal = products.reduce((acc, item) => acc + item.price.toFixed(2) * item.quantity,0);
      setTotal(calculatedTotal);
    }
  }, [products]);


  return (
    <div className="cart">
      {isLoading && <Loading/>}
      {!isLoading &&
      <div className="container-cart-stats">
        <form className="container-address" onSubmit={handleAdressSubmit}>
            <h2><TbMapPinFilled/> Selecione seu endereço</h2>
            <div className="address-content">
              <div className="address-input">
                <input type="number" placeholder="Digite seu Cep" value={address} required onChange={handleChange}/>
                <button>OK</button>
              </div>
              <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="blank_">Não sei meu CEP</a>
            </div>
              {addressData !== "error" && addressData !== undefined && (
              <p>
               <strong>Entregar em:</strong> {` ${addressData.bairro} - ${addressData.localidade}/${addressData.uf}`}
              </p>)}
              {addressData == "error" && <p>Cep não encontrado, consulte seu cep e digite novamente!</p>}
          </form>
          <div className="content-cart-stats">
             <div className="buy-container">
               <h2 className="buy-container-title"><RiShoppingBasket2Line/> Produtos</h2>
               {products.length == 0 && <p className="teste">Carinho vazio...</p>}
               {products.map(product => (
                  <div key={product.id} className="buy-product-list">
                  <div className="product-content">
                      <div className="product-info">
                        <Link draggable="false" to={`/product/${product.id}`}><img draggable="false" src={product.image} alt={product.name}/></Link>
                        <div className="product">
                          <span className="title-product">{product.name}</span>
                          <button
                            className="delete-btn" 
                            onClick={() => deleteProduct(product.id)}>Excluir</button>
                        </div>
                      </div>
                        <div className="buy-form">
                          <button onClick={() => previousQuantity(product)}>-</button>
                          <span>{product.quantity}</span>
                         <button onClick={() => nextQuantity(product)}>+</button>
                      </div>
                        <span className="price-cart">
                         {formatCurrency(product.price * product.quantity, "BRL")}
                        </span>
                    </div>
                </div>
                ))}
            </div>
            <div className="buy-stats">
              <div className="stats-title-container">
                <span className="stats-title">Resumo da compra</span>
              </div>
                <div className="total-value">
                  Quantidade de Produtos: <b>{products.length}</b>
                </div>
                <div className="total-value">
                  Valor dos Produtos: <b>{formatCurrency(total, "BRL")}</b>
                </div>
                <div className="cart-value">
                  <p id="cart-total">total à prazo: <b>{formatCurrency(total, "BRL")}</b></p>
                  <p id="parcel-total">(Em até <b>10x</b> de <b>{formatCurrency(total / 10, "BRL")}</b> sem juros)</p>
                </div>
                <div className="pix-value">
                  <p>Valor à vista no <b>Pix:</b></p>
                  <span className="pix-price">{formatCurrency(total - ( total * 10 /100), "BRL")}</span>
                </div>
                <div className="payment-container">
                  <button className="payment-btn" onClick={handlePaymentProducts}>Ir para o pagamento</button>
                  <Link to="/"><button className="continue">Continuar Comprando</button></Link>
                </div>
           </div>
        </div>
      </div>}
    </div>
    );
}

export default Cart;
