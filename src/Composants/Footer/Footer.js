import iconInstagram from '../../icons/icon-instagram.png'
import iconFacebook from '../../icons/icon-facebook.png'
import iconTwitter from '../../icons/icon-twitter.png'
import './Footer.scss'

const Footer = () => {
    return(
        <footer className="pied-page">
            <p> <img src={iconFacebook} alt="Facebook" /> </p>
            <p> <img src={iconInstagram} alt="Instagram" /> </p>
            <p> <img src={iconTwitter} alt="Twitter" /> </p>
        </footer>
    )
}


export default Footer