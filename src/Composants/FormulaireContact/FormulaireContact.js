import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./FormulaireContact.scss";

const FormulaireContact = () => {
  return (
    <div className="formulaire-contact">
      <form>
        <h1> Nous Contacter </h1>
        <div className="element-grid">
          <FloatingLabel controlId="floatingInput" label="Nom" className="nom">
            <Form.Control type="text" placeholder="Nom" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Prénom"
            className="prenom"
          >
            <Form.Control type="text" placeholder="Prénom" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Adress em@il"
            className="email"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Commentaire"
            className="commentaire"
          >
            <Form.Control
              as="textarea"
              placeholder="Laissais un commentaire"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <div className="boutton">
            <Button className="submit"> Envoyer </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormulaireContact;
