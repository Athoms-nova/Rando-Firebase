import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button, Dropdown } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./BarreFiltre.scss";
import { listeType } from "../../Variable/Variable";

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
    <Form.Floating className="item">
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

const FiltreNormal = ({
  categorieRef,
  rechercheRef,
  typeRef,
  nbCategorieCheck,
  onSubmit,
  onClickCheck,
}) => {
  return (
    <div className="filtre-normal">
      <h2> Cherche Avancer </h2>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <Button type="submit"> Valider </Button>
      </form>
    </div>
  );
};

const FiltreMobile = ({
  categorieRef,
  rechercheRef,
  typeRef,
  nbCategorieCheck,
  onSubmit,
  onClickCheck,
}) => {
  return (
    <Accordion defaultActiveKey="0" style={{width : "100%" }} className="filtre-mobile">
      <Accordion.Item eventKey="0">
        <Accordion.Header> Cherche Avancer</Accordion.Header>
        <Accordion.Body>
          <form onSubmit={(e) => onSubmit(e)} className="form-mobile">
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

const BarreFiltre = ({
  categorieRef,
  rechercheRef,
  typeRef,
  nbCategorieCheck,
  onSubmit,
  onClickCheck,
}) => {
  return (
    <div className="barre-filtre">
      {/* <FiltreNormal
        categorieRef={categorieRef}
        rechercheRef={rechercheRef}
        typeRef={typeRef}
        nbCategorieCheck={nbCategorieCheck}
        onSubmit={onSubmit}
        onClickCheck={onClickCheck}
      /> */}

      <FiltreMobile
        categorieRef={categorieRef}
        rechercheRef={rechercheRef}
        typeRef={typeRef}
        nbCategorieCheck={nbCategorieCheck}
        onSubmit={onSubmit}
        onClickCheck={onClickCheck}
      />
    </div>
  );
};

export default BarreFiltre;
