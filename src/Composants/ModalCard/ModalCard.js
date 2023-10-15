import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import React, { useContext } from "react";
import LeafletModalCard from "../LeafletModalCard/LeafletModalCard";
import { ConversionMinToHeur } from "../../Fonction/Fonction";
import "./ModalCard.scss";
import { GestionContext } from "../../Context/GestionContext";


const CarouselSimple = ({ imageListe }) => {
  return (
    <Carousel fade className="carousel-simple">
      <Carousel.Item>
      <img className="image-carousel" src={require("../../Fond/route.jpg")} alt="First" />
    </Carousel.Item>
    </Carousel>
  );
};

const ModalCard = () => {
  const {setShowModalElement, showModalElement, elementSelect} = useContext(GestionContext)
  const distance = elementSelect.type === "Randonnée" ? elementSelect.distance/1000 : "---"
  const duree = elementSelect.type === "Randonnée" ? ConversionMinToHeur(elementSelect.duree) : "---"
  const niveau = elementSelect.type === "Randonnée" ? elementSelect.niveau : "---"

  return (
    <Modal show={showModalElement} onHide={() => setShowModalElement(false)} className="modale-card">
      <Modal.Header closeButton>
        <Modal.Title>{elementSelect.nom}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-part">
          <LeafletModalCard info={elementSelect} />
          <div className="separation"></div>
          <CarouselSimple imageListe={[elementSelect.urlImageCard]} />
        </div>
        <div className="info-carousel">
          <ul className="liste-info">
            <li> Ville : {elementSelect.ville} </li>
            <li> Difficulté : {niveau} </li>
            <li> Durée : {duree} </li>
            <li> Distance : {distance} Km </li>
          </ul>
          <p>{elementSelect.information}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalElement(false)}>
          {" "}
          Close{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCard;
