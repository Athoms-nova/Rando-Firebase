const fs = require("fs");

let fichier = fs.readFileSync("./Liste_Rando_Lieu.json");

let element = JSON.parse(fichier);

let newListe = { RandoLieu: {} };

element["RandoLieu"].map((item) => {
  newListe["RandoLieu"][item["_id"]] = item;
});

let donnees = JSON.stringify(newListe);
fs.writeFileSync("ListeRando.json", donnees);

console.log(element["RandoLieu"][0]);
