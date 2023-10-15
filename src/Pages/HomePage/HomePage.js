import BarreRecherche from '../../Composants/BarreRecherche/BarreRecherche'
import CardHome from '../../Composants/CardHome/CardHome'
import iconCarte from '../../icons/icon-carte.png'
import iconRandonnee from '../../icons/icon-trekking.png'
import iconLieu from '../../icons/icon-pointer-map.png'
import './HomePage.scss'
import { useContext } from 'react'
import { GestionContext } from '../../Context/GestionContext'



const HomePage = () => {
  const {OnClickButtonCardHome} = useContext(GestionContext)
  return(
    <div className='home-page'>
      <BarreRecherche />
      <h1 className='title-home'> GOOD PAYSAGE </h1>
      <div className='liste-card-home'>
        <CardHome image={iconCarte} title={"Carte"} onClick={OnClickButtonCardHome}/>
        <CardHome image={iconRandonnee} title={"Randonnée"} onClick={OnClickButtonCardHome}/>
        <CardHome image={iconLieu} title={"Lieu"} onClick={OnClickButtonCardHome}/>
      </div>
    </div>
  )
}

export default HomePage
