import "./styles/Payment.css"
import QRcode from "react-qr-code"
import { useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import formatCurrency from "../Utils/FormatCurrency"
import { useNavigate } from "react-router-dom"
function Payment() {

  const [cardNumber, setCardNumber] = useState()
  const [cardName, setCardName] = useState()
  const [cardDataMM, setCardDataMM] = useState("00")
  const [cardDataYY, setCardDataYY] = useState("00")
  const [cardCvc ,setCardCvc] = useState()
  const [methodPayment, setMethodPayment] = useState("Cartão Crédito")
  const navigate = useNavigate()
  const parcelValue = []


  const { data: paymentData, isLoading } = useQuery("payment", async() =>{
    const response = await axios.get("https://json-shopping.vercel.app/payment")
    
    return response.data
  })


  const handleCardChangeNumber = (e) => {
    const inputNumber = e.target.value
    const formattedNumber = formatCardNumber(inputNumber)
   
    setCardNumber(formattedNumber);
  }

  

  const formatCardNumber = (number) => {
    if(number < 1) return
    const trimmedNumber = number.replace(/\s/g, '');
    const chunks = trimmedNumber.match(/.{1,4}/g);
    const formattedNumber = chunks.join('');

    return formattedNumber;
  }
  
  const handleCard = (e, set) => {
    set(e.target.value)
  }

  const handleOnSubmitPayment = (e) => {
    e.preventDefault()
    navigate("/success")
  }

  
  function totalParcel() {
    for(let i= 1; i <= 10; i++){
      let contParcel = formatCurrency(paymentData[0].total / [i], "BRL")
      parcelValue.push(`${contParcel} em ${[i]}x sem juros`)
    }
  }

 {paymentData !== undefined && paymentData.length !== 0 && totalParcel()}


  return ( 
    <div className="payment-container-card">
      <div className="left-column">
      {methodPayment == "Pix" && (
          <div className="pix-phone-container">
            <div className="pix-phone-content"></div>
          </div>
      )}
      {methodPayment !== "Pix" && (
      <div className="card">
         <div className="card-container-payment">
           <div className="card-info-payment">
            <span id="card-number">{cardNumber ? cardNumber : "0000 0000 0000 0000"}</span>
              <div className="card-name-data">
                <span id="card-name">{cardName ? cardName : "Nome no cartão"}</span>
                <span id="card-data">
                  {cardDataMM || cardDataYY ? `${cardDataMM}/${cardDataYY}` : "00/00"}
                </span>
            </div>
          </div>
         </div>
         <div className="card-container-back">
            <div className="card-back-black"></div>
              <div className="cvc-bar">
              <span> {cardCvc ? cardCvc : "000"}</span>
            </div>
         </div>
       </div>)}
     </div>
      <div className="payment-form-container">
        <div className="select-method-payment">
          <button onClick={(e) => setMethodPayment(e.target.innerHTML)}>Pix</button>
          <button onClick={(e) => setMethodPayment(e.target.innerHTML)}>Cartão Débito</button>
          <button onClick={(e) => setMethodPayment(e.target.innerHTML)}>Cartão Crédito</button>
        </div>
        {methodPayment == "Pix" && 
          <div className="qrcode">
            <QRcode value="www.google.com"/>
            <span id="total-value-pix">
             {!isLoading && formatCurrency(paymentData[0].total  - ( paymentData[0].total  * 10 /100), "BRL")}
            </span>
          </div>}
        
        {methodPayment !== "Pix" &&
         <form onSubmit={handleOnSubmitPayment}>
          <div className="card-name-box card-input">
            <label htmlFor="input-card-name">Nome no cartão</label>
            <input 
              type="text" 
              className="card-name-input"
              onChange={(e) => handleCard(e, setCardName)}
              maxLength={40}
              autoFocus={true}
              id="input-card-name"
              placeholder=""
              required
              />
          </div>
          <div className="card-number-box card-input">
            <label htmlFor="input-card-number">Número do cartão</label>
            <input 
              type="text" 
              className="card-number-input" 
              onChange={handleCardChangeNumber}
              maxLength={16}
              id="input-card-number"
              required
              />
          </div>
          <div className="card-data-cvc">
            <div className="card-data">
              <label htmlFor="input-card-data-mm">Data de vencimento</label>
                <div className="card-data-input">
                  <input 
                    type="text" 
                    className="card-data-mm"
                    onChange={(e) => handleCard(e, setCardDataMM)}
                    maxLength={2}
                    id="input-card-data-mm"
                    placeholder="MM"
                    required
                    />
                    
                  <input 
                    type="text"
                    className="card-data-yy"
                    maxLength={2}
                    onChange={(e) => handleCard(e, setCardDataYY)}
                    placeholder="YY"
                    required
                    />
                </div>
            </div>
            <div className="card-cvc-input card-input">
              <label htmlFor="input-card-cvc">cvc</label>
                <input 
                  type="text"
                  onChange={(e) => handleCard(e, setCardCvc)}
                  maxLength={3}
                  id="input-card-cvc"
                  required
                  />
            </div>
          </div>
          <div className="card-input select-parcel-value">
            <label htmlFor="parcelId">Parcelas</label>
              <select id="parcelId">
                {!isLoading && parcelValue.map((parcel) => <option key={parcel} value={parcel}>{parcel}</option>)}
              </select>
          </div>
          <button className="card-payment-btn">Confirmar</button>
        </form>}
      </div>
    </div>
   );
}
 
export default Payment;