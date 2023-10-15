import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button, Dropdown } from "react-bootstrap";
import { listeType, listeCommune } from "../../Variable/Variable";
import Accordion from "react-bootstrap/Accordion";
import "./BarreFiltreCarte.scss";
import { useCallback, useEffect, useState } from "react";

const SelectOptionType = ({ label, listeOption, variableRef }) => {
  return (
    <FloatingLabel controlId="floatingSelect" label={label} className="item">
      <Form.Select aria-label="Floating label select example" ref={variableRef}>
        {listeOption.map((option) => (
          <option value={option} key={option}>
            {" "}
            {option}{" "}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

const SelectCheckBoxPetit = ({
  label,
  variableRef,
  nbCategorieCheck,
  onClickCheck,
}) => {
  return (
    <Dropdown className="select-checkbox item" autoClose={false}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {label} ({nbCategorieCheck})
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(variableRef).map((option) => (
          <Dropdown.Item key={option} onClick={() => onClickCheck(option)}>
            <input type="checkbox" name={option} ref={variableRef[option]} />
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const RechercheElementInput = ({ label, variableRef }) => {
  return (
    <Form.Floating className="item recherche">
      <Form.Control
        id="floatingInputCustom"
        type="text"
        placeholder="Lieu"
        ref={variableRef}
      />
      <label htmlFor="floatingInputCustom">{label}</label>
    </Form.Floating>
  );
};

const BarreFiltreCarte = ({
  categorieRef,
  rechercheRef,
  typeRef,
  nbCategorieCheck,
  onSubmit,
  onClickCheck,
  villeRef,
  ville,
  type
}) => {
  return (
    <Accordion
      defaultActiveKey="0"
      style={{ width: "100%" }}
      className="barre-filtre-carte"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Cherche Avancer [ ville : {ville} ] - [ type : {type} ]
        </Accordion.Header>
        <Accordion.Body>
          <form onSubmit={(e) => onSubmit(e)}>
            <SelectOptionType
              label={"Commune"}
              listeOption={listeCommune}
              variableRef={villeRef}
            />
            <SelectOptionType
              label={"type"}
              listeOption={listeType}
              variableRef={typeRef}
            />
            <SelectCheckBoxPetit
              label={"Categorie"}
              variableRef={categorieRef}
              nbCategorieCheck={nbCategorieCheck}
              onClickCheck={onClickCheck}
            />
            <RechercheElementInput
              label={"Recherche"}
              variableRef={rechercheRef}
            />
            <Button type="submit"> Valider </Button>
          </form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

/* const BarreFiltreCarte = ({
  categorieRef,
  villeRef,
  rechercheRef,
  typeRef,
  nbCategorieCheck,
  onSubmit,
  onClickCheck,
}) => {
  return (
    <div className="barre-filtre-carte">
      <form onSubmit={(e) => onSubmit(e)}>
        <SelectOptionType
          label={"Commune"}
          listeOption={listeCommune}
          variableRef={villeRef}
        />
        <SelectOptionType
          label={"type"}
          listeOption={listeType}
          variableRef={typeRef}
        />
        <SelectCheckBoxPetit
          label={"Categorie"}
          variableRef={categorieRef}
          nbCategorieCheck={nbCategorieCheck}
          onClickCheck={onClickCheck}
        />
        <RechercheElementInput label={"Recherche"} variableRef={rechercheRef} />
        <Button type="submit" className="flex-item">
          {" "}
          Valider{" "}
        </Button>
      </form>
    </div>
  );
}; */

export default BarreFiltreCarte;
