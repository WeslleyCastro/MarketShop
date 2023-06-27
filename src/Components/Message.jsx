import { useEffect, useState} from "react";
import { MdDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc"
import "./Message.css"

function Message({msg, type}) {
  const [isActive, setIsActive] = useState(false)

  useEffect(()=> {
    setIsActive(true)
    const timer = setTimeout(()=> {
      setIsActive(false)
    }, 3000)

    return () => clearTimeout(timer)
  },[])


  return (   
    <>
      {isActive && (
        <div className={`message ${type}`}>
          {type == "success" && <p><MdDone/> {msg}</p>}
          {type == "error" && <p><FcCancel/> {msg}</p>}
        </div>
      )}
    </>
  );
}

export default Message;