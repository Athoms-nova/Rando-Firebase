import CardElement from "../../Composants/CardElement/CardElement";
import { useContext, useEffect, useRef, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import BarreFiltreCarte from "../../Composants/BarreFiltreCarte/BarreFiltreCarte";
import ModalCard from "../../Composants/ModalCard/ModalCard";
import "./CartePointerPage.scss";
import {
  VerificationListeDansListe,
  GestionListePage,
  FormatageListeElementVue,
} from "../../Fonction/Fonction";
import VueListePage from "../../Composants/VueListePage/VueListePage";
import CarteLeaflet from "../../Composants/CarteLeaflet/CarteLeaflet";
import VueErrorServeur from "../../Composants/VueErrorServeur/VueErrorServeur";

const Page = () => {
  const {
    listeElementVueMap,
    setListeElementVueMap,
    allElement,
    showModalElement,
  } = useContext(GestionContext);

  const [pageActuel, setPageActuel] = useState(1);
  const [currentVille, setCurrentVille] = useState("All");
  const [currentType, setCurrentType] = useState("All");

  const categorieRef = {
    Montagne: useRef(),
    Plage: useRef(),
    Litoral: useRef(),
    Foret: useRef(),
    Bassin: useRef(),
  };

  const typeRef = useRef();
  const villeRef = useRef();
  const rechercheElementRef = useRef();
  const [nbCategorieCheck, setNbCategorieCheck] = useState(0);
  const [listeNumPage, setListeNumPage] = useState([]);

  /***
   *
   * Partie filtre
   *
   */

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

    newListe =
      villeRef.current.value === "All"
        ? newListe
        : newListe.filter((item) => item.ville === villeRef.current.value);

    newListeVue = FormatageListeElementVue(4, newListe);
    setListeElementVueMap([...newListeVue]);
    setCurrentVille(villeRef.current.value);
    setCurrentType(typeRef.current.value);
    ActualisationListePage(1, newListeVue.length, 4);
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
    ActualisationListePage(page, listeElementVueMap.length, 4);
  };

  const GestionButtonListePage = (info) => {
    if (info === "fin") {
      ActualisationListePage(
        listeElementVueMap.length,
        listeElementVueMap.length,
        4
      );
    } else if (info === "debut") {
      ActualisationListePage(1, listeElementVueMap.length, 4);
    } else if (
      (info === "suivant") &
      (pageActuel < listeElementVueMap.length)
    ) {
      ActualisationListePage(pageActuel + 1, listeElementVueMap.length, 4);
    } else if ((info === "precedent") & (pageActuel > 1)) {
      ActualisationListePage(pageActuel - 1, listeElementVueMap.length, 4);
    }
  };

  useEffect(() => {
    setListeNumPage(
      GestionListePage(listeElementVueMap.length, pageActuel, 4, 1)
    );
  }, [listeElementVueMap, pageActuel]);

  useEffect(() => {
    setListeElementVueMap(FormatageListeElementVue(4, allElement));
  }, [allElement]);

  return (
    <div className="carte-pointer-page">
      {showModalElement && <ModalCard />}
      <div className="leaflet-liste-lieu">
        <div className="select-liste-lieu">
          <BarreFiltreCarte
            categorieRef={categorieRef}
            typeRef={typeRef}
            rechercheRef={rechercheElementRef}
            villeRef={villeRef}
            onSubmit={OnSubmitFiltreForm}
            onClickCheck={OnChangeCategorie}
            nbCategorieCheck={nbCategorieCheck}
            ville={currentVille}
            type={currentType}
          />
          <div className="liste-lieu">
            {listeElementVueMap.length > 0 &&
              listeElementVueMap[pageActuel - 1].map((element) => (
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
            OnDeplacementPage={GestionButtonListePage}
          />
        </div>
        <CarteLeaflet
          listeElementVue={listeElementVueMap}
          pageActuel={pageActuel}
          ville={currentVille}
        />
      </div>
    </div>
  );
};

const CartePointerPage = () => {
  const { flagDataServeur } = useContext(GestionContext);
  return <div>{flagDataServeur ? <Page /> : <VueErrorServeur />}</div>;
};

export default CartePointerPage;
