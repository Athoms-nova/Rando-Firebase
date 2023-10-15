import CardElement from "../../Composants/CardElement/CardElement";
import ModalCard from "../../Composants/ModalCard/ModalCard";
import { useContext, useEffect, useRef, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import BarreFiltre from "../../Composants/BarreFiltre/BarreFiltre";
import "./ElementPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  VerificationListeDansListe,
  GestionListePage,
  FormatageListeElementVue,
} from "../../Fonction/Fonction";
import VueListePage from "../../Composants/VueListePage/VueListePage";
import VueErrorServeur from "../../Composants/VueErrorServeur/VueErrorServeur";

const Page = () => {
  const {
    listeElementVue,
    setListeElementVue,
    allElement,
    showModalElement,
    //currentPath,
    flagChangeNav,
  } = useContext(GestionContext);
  const [titlePage, setTitlePage] = useState("");
  const [pageActuel, setPageActuel] = useState(1);
  const navigation = useNavigate();
  const currentPath = useLocation();

  const categorieRef = {
    Montagne: useRef(),
    Plage: useRef(),
    Litoral: useRef(),
    Foret: useRef(),
    Bassin: useRef(),
  };

  const typeRef = useRef();
  const rechercheElementRef = useRef();
  const [nbCategorieCheck, setNbCategorieCheck] = useState(0);
  const [listeNumPage, setListeNumPage] = useState([]);

  /***
   *
   * Partie filtre
   *
   */

/*   useEffect(() => {
    if (flagChangeNav !== "Carte") {
      try {
        Object.keys(categorieRef).map(
          (categorie) => (categorieRef[categorie].current.checked = false)
        );
      } catch (error) {}
      rechercheElementRef.current.value = "";
      typeRef.current.value = flagChangeNav;
      setNbCategorieCheck(0);
      setListeElementVue(
        FormatageListeElementVue(8, [
          ...allElement.filter((item) => item.type === flagChangeNav),
        ])
      );
    }
  }, [flagChangeNav]); */

  /* useEffect(() => {
    console.log(listeElementVue)
  },[allElement]) */

  const OnChangeCategorie = (categorie) => {
    categorieRef[categorie].current.checked =
      !categorieRef[categorie].current.checked;
    if (categorieRef[categorie].current.checked) {
      setNbCategorieCheck(nbCategorieCheck + 1);
    } else {
      setNbCategorieCheck(nbCategorieCheck - 1);
    }
  };

  const OnSubmitFiltreForm = (e) => {
    e.preventDefault();
    let newListeVue = [];
    let newListe =
      typeRef.current.value === "All"
        ? [...allElement]
        : [...allElement.filter((item) => item.type === typeRef.current.value)];

    try {
      const categorieTrue = Object.keys(categorieRef).filter(
        (element) => categorieRef[element].current.checked === true
      );
      if (categorieTrue.length > 0) {
        newListe = newListe.filter((element) =>
          VerificationListeDansListe(element.categorie, categorieTrue)
        );
      }
    } catch (error) {}

    if (rechercheElementRef.current.value !== "") {
      newListe = newListe.filter(
        (item) =>
          item.nom
            .toUpperCase()
            .indexOf(rechercheElementRef.current.value.toUpperCase()) > -1
      );
    }

    newListeVue = FormatageListeElementVue(8, newListe);
    setListeElementVue([...newListeVue]);
    setTitlePage(typeRef.current.value);
    ActualisationListePage(1, newListeVue.length, 4);
    navigation("/" + typeRef.current.value);
  };

  /**
   *
   * Partie Gestion liste Page
   *
   */

  const ActualisationListePage = (actuelPage, nbPage, pageVisible) => {
    setPageActuel(actuelPage);
    setListeNumPage(GestionListePage(nbPage, actuelPage, pageVisible, 1));
  };

  const OnClickPage = (page) => {
    ActualisationListePage(page, listeElementVue.length, 4);
  };

  const GestionRandoListePage = (info) => {
    if (info === "fin") {
      ActualisationListePage(listeElementVue.length, listeElementVue.length, 4);
    } else if (info === "debut") {
      ActualisationListePage(1, listeElementVue.length, 4);
    } else if ((info === "suivant") & (pageActuel < listeElementVue.length)) {
      ActualisationListePage(pageActuel + 1, listeElementVue.length, 4);
    } else if ((info === "precedent") & (pageActuel > 1)) {
      ActualisationListePage(pageActuel - 1, listeElementVue.length, 4);
    }
  };

  useEffect(() => {
    if (currentPath.pathname === "/Lieu") {
      typeRef.current.value = "Lieu";
      setTitlePage("Lieu");
    } else if (currentPath.pathname === "/Randonn%C3%A9e") {
      typeRef.current.value = "Randonnée";
      setTitlePage("Randonnée");
    } else if (currentPath.pathname === "/All") {
      typeRef.current.value = "All";
      setTitlePage("All");
    }
  }, [currentPath]);

  useEffect(() => {
    setListeNumPage(GestionListePage(listeElementVue.length, pageActuel, 4, 1));
  }, [listeElementVue, pageActuel]);

  return (
    <div className="element-page">
      {showModalElement && <ModalCard />}
      {/* <BarreRecherche /> */}
      <BarreFiltre
        nbCategorieCheck={nbCategorieCheck}
        categorieRef={categorieRef}
        typeRef={typeRef}
        rechercheRef={rechercheElementRef}
        onSubmit={OnSubmitFiltreForm}
        onClickCheck={OnChangeCategorie}
      />
      <h1 className="title-page"> {titlePage} </h1>
      <div className="liste-rando">
        {listeElementVue.length > 0 &&
          listeElementVue[pageActuel - 1].map((element) => (
            <CardElement
              info={element}
              randonnee={element.type === "Randonnée" ? true : false}
              key={element._id}
            />
          ))}
      </div>
      <VueListePage
        listeNumPage={listeNumPage}
        pageActuel={pageActuel}
        OnClickPage={OnClickPage}
        OnDeplacementPage={GestionRandoListePage}
      />
    </div>
  );
};

const ElementPage = () => {
  const { flagDataServeur } = useContext(GestionContext);
  return <div>
    {flagDataServeur ? <Page /> : <VueErrorServeur/>}
  </div>;
};

export default ElementPage;
