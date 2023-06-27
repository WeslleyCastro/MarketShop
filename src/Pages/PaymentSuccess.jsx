import axios from "axios";
import { useQuery} from "react-query";
import { MdDone } from "react-icons/md"
import Loading from "../Components/Loading";
import "./styles/PaymentSuccess.css"
function PaymentSuccess() {

  const { data, isLoading } = useQuery("paymentInfo", async() => {
    const response = await axios.get("https://json-shopping.vercel.app/payment")

    return response.data[0]
  })

  return ( 
    <div className="success-container">
      {isLoading && <Loading/>}
      {!isLoading && (
      <div className="sucess-content">
          <h1>Compra Realizada!</h1>
            <div className="done-icon">
              <MdDone/>
            </div>
          <p>Os Produtos serão entregue no endereço: {`${data.bairro} ${data.localidade} ${data.uf}`} </p>
      </div>)}
    </div>
   );
}

export default PaymentSuccess;