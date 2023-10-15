const ConversionFloatSuperieur = (nombre) => {
  try {
    if (nombre.toString().indexOf(".") > -1) {
      return Math.trunc(nombre) + 1;
    } else {
      return nombre;
    }
  } catch (error) {
    return false;
  }
};

const ConversionMinToHeur = (tempsMin) => {
  const heur = Math.trunc(tempsMin / 60);
  const min = tempsMin % 60 < 10 ? "0" + (tempsMin % 60) : tempsMin % 60;
  return "" + heur + "h" + min;
};

const FormatageListeElementVue = (group, liste) => {
  const newListe = [];
  let nbPage = ConversionFloatSuperieur(liste.length / group);
  let indice = 0;
  let flagFin = false;
  for (let page = 0; page < nbPage; page++) {
    const listePage = [];
    for (let element = 0; (element < group) & !flagFin; element++) {
      listePage.push(liste[indice]);
      indice++;
      if (indice === liste.length) {
        flagFin = true;
      }
    }
    newListe.push([...listePage]);
  }
  return newListe;
};

const VerificationListeDansListe = (liste1, liste2) => {
  let flag = true;
  liste1.map((item) => {
    if (liste2.indexOf(item) === -1) {
      flag = false;
    }
  });
  return flag;
};


const RequestGetAllElement = () => {
  return fetch(process.env.REACT_APP_PATH_SERVEUR + "get-all-element", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
};

const GestionListePage = (nbPage, actuelPage, pageVisible, espace) => {
  let listePage = [];
  if ((actuelPage > 0) & (espace > 0)) {
    if (nbPage < pageVisible) {
      for (let i = 0; i < nbPage; i++) {
        listePage.push(i + 1);
      }
    } else {
      if ((actuelPage > espace) & (actuelPage < nbPage - espace)) {
        for (let i = actuelPage - espace; listePage.length < pageVisible; i++) {
          listePage.push(i);
        }
      } else if (actuelPage <= espace) {
        for (let i = 0; i < pageVisible; i++) {
          listePage.push(i + 1);
        }
      } else if (actuelPage >= nbPage - espace) {
        for (
          let i = nbPage - pageVisible + 1;
          listePage.length < pageVisible;
          i++
        ) {
          listePage.push(i);
        }
      }
    }
  }
  return listePage;
};

const PointMilieuListeCoordonne = (tableau) => {
  let x = []
  let y = []
  tableau.map( coordonne => {
    x.push(coordonne[0])
    y.push(coordonne[1])
  })
  //console.log(Math.max(...x))
  return [ (Math.max(...x) + Math.min(...x)) / 2, (Math.max(...y) + Math.min(...y)) / 2] 
}

export {
  ConversionFloatSuperieur,
  ConversionMinToHeur,
  FormatageListeElementVue,
  VerificationListeDansListe,
  RequestGetAllElement,
  GestionListePage,
  PointMilieuListeCoordonne
};
