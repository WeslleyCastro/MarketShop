import "./Footer.css"
import { BsTwitter, BsLinkedin, BsInstagram} from "react-icons/bs"


function Footer() {
  return ( 
    <footer>
     <h3>Rede Social</h3>
      <ul>
        <li><a href="https://twitter.com/westrofps" target="blank"><BsTwitter/></a></li>
        <li><a href="https://www.linkedin.com/in/weslley-castro-da-silva/" target="blank"><BsLinkedin/></a></li>
        <li><a href="https://www.instagram.com/weslleyrds_/" target="blank"><BsInstagram/></a></li>
      </ul>
      <small>Weslley Castro | 2023</small>
    </footer>
   
   );
}

export default Footer
