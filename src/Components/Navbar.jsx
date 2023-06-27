import { BsSearch, BsCart2 } from "react-icons/bs"
import { SiCoinmarketcap } from "react-icons/si"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  
  const handleOnClick = (e) => {
    e.preventDefault()
    if(search.length == 0) return
    navigate(`search?q=${search}`)
    setSearch("")
  }
 
  return ( 
    <header>
     <div className="navbar-content">
      <Link to="/" className="logo"><div><SiCoinmarketcap/></div><span id="text-logo">MarketShop</span></Link>
        <div className="search-cart">
          <form>
            <div>
              <input
                type="text" 
                placeholder="Buscar produtos" 
                onChange={(e) => setSearch(e.target.value)}
                value={search}/>
              <button onClick={handleOnClick} type="submit"><BsSearch/></button>
              </div>
            </form>
          </div>
        <Link to="cart" className="cart-btn"><span id="text-cart">Acesse seu carrinho</span><BsCart2/></Link>
      </div>
    </header>
   );
}

export default Navbar;