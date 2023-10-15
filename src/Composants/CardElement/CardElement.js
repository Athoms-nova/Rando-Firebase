import { useContext } from "react";
import { AnimationCarteContext } from "../../Context/AnimationCarteContext";
import { GestionContext } from "../../Context/GestionContext";
import { ConversionMinToHeur } from "../../Fonction/Fonction";
import "./CardElement.scss";

const CardElement = ({ info, randonnee }) => {
  const { OnclickCardElement } =
    useContext(GestionContext);
  const { setCardHover, pointerCarteHover } = useContext(
    AnimationCarteContext
  );

  const OnHoverMouse = () => {
    setCardHover(info._id);
  };

  const LeaveHoverMouse = () => {
    setCardHover(false);
  };
  return (
    <div
      className={
        pointerCarteHover === info._id
          ? "card-element card-element-hover"
          : "card-element card-element-no-hover"
      }
      onClick={() => OnclickCardElement(info)}
      onMouseEnter={OnHoverMouse}
      onMouseLeave={LeaveHoverMouse}
    >
      <div className="card-randonne-top">
        {randonnee && (
          <div className="card-info-rando">
            <p> difficulté : {info.niveau} </p>
            <p>
              {" "}
              Durée : {ConversionMinToHeur(info.duree)} {"=>"}{" "}
              {info.distance / 1000} km{" "}
            </p>
          </div>
        )}
        <p>
          {" "}
          <img src={info.urlImageCard} alt={info.nom} />{" "}
        </p>
      </div>
      <h2 className="card-title"> {info.nom} </h2>
    </div>
  );
};

export default CardElement;
