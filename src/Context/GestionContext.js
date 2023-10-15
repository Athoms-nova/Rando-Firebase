import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormatageListeElementVue,
  RequestGetAllElement,
} from "../Fonction/Fonction";
import { database } from "../Firebase/firebase";
import { ref, onValue } from "firebase/database";

export const GestionContext = createContext();

export const GestionProvider = ({ children }) => {
  const [allElement, setAllElement] = useState([]);
  const [listeElementVue, setListeElementVue] = useState([]);
  const [listeElementVueMap, setListeElementVueMap] = useState([]);
  const [elementSelect, setElementSelect] = useState({});
  const [showModalElement, setShowModalElement] = useState(false);
  const navigation = useNavigate();
  const currentPath = useLocation();
  const [flagChangeNav, setFlagChangeNav] = useState(false);
  const [flagDataServeur, setFlagDataServeur] = useState(false);
  const db = database;

  const ActualisationElementRendu = (filterType, listeDesElement) => {
    const newListe = [...listeDesElement];
    const listeFormater =
      filterType === "All"
        ? FormatageListeElementVue(8, newListe)
        : filterType === "Carte"
        ? FormatageListeElementVue(4, newListe)
        : FormatageListeElementVue(
            8,
            newListe.filter((element) => element.type === filterType)
          );
    setListeElementVue([...listeFormater]);
  };

/*   const DownloadData = async () => {
    const statue = await RequestGetAllElement()
      .then((rep) => rep.json())
      .then((data) => {
        const dataGet = Object.values(data);
        setAllElement([...dataGet]);
        if (currentPath.pathname === "/Lieu") {
          ActualisationElementRendu("Lieu", dataGet);
        } else if (currentPath.pathname === "/Randonn%C3%A9e") {
          ActualisationElementRendu("Randonnée", dataGet);
        } else if (currentPath.pathname === "/All") {
          ActualisationElementRendu("All", dataGet);
        } else if (currentPath.pathname === "/Carte") {
          ActualisationElementRendu("Carte", dataGet);
        }
        setFlagDataServeur(true);
      });
  };
 */
  /**
   *
   *  Firbasse
   *
   */

  const DownloadDataFirbase = () => {
    onValue( ref(db, "RandoLieu"), (snapshot) => {
      const data = snapshot.val()
      const liste = []
      Object.keys(data).map( id => liste.push(data[id]))
      setAllElement(liste)
      if (currentPath.pathname === "/Lieu") {
        ActualisationElementRendu("Lieu", liste);
      } else if (currentPath.pathname === "/Randonn%C3%A9e") {
        ActualisationElementRendu("Randonnée", liste);
      } else if (currentPath.pathname === "/All") {
        ActualisationElementRendu("All", liste);
      } else if (currentPath.pathname === "/Carte") {
        ActualisationElementRendu("Carte", liste);
      }
      setFlagDataServeur(true);
    } )
  };

  useEffect(() => {
    //DownloadData();
    DownloadDataFirbase()
  }, []);

  /***
   *
   * Navigation Home and top
   *
   */

  const OnClickButtonCardHome = (title) => {
    setFlagChangeNav(title);
    navigation("/" + title);
  };

  const OnclickCardElement = (element) => {
    setElementSelect(element);
    setShowModalElement(true);
  };

  return (
    <GestionContext.Provider
      value={{
        listeElementVue,
        setListeElementVue,
        allElement,
        listeElementVueMap,
        setListeElementVueMap,
        showModalElement,
        setShowModalElement,
        elementSelect,

        OnClickButtonCardHome,
        OnclickCardElement,
        currentPath,
        flagChangeNav,
        flagDataServeur,
      }}
    >
      {children}
    </GestionContext.Provider>
  );
};
