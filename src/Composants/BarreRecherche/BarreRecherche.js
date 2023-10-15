import iconSearche from '../../icons/icon-search.png'
import "./BarreRecherche.scss";


const BarreRecherche = () => {
  return (
    <nav className="barre-recherche-home">
      <p>
        {" "}
        <img src={iconSearche} alt="icone recherche" />{" "}
      </p>
      <input type="text" id="input-home" />
      <button> Rechercher </button>
    </nav>
  );
};

export default BarreRecherche