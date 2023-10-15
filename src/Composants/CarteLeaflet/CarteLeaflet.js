import { useContext, useEffect } from "react";
import { GestionContext } from "../../Context/GestionContext";
import { Polyline, Tooltip, useMap} from "react-leaflet";
import { greenIcon, blackIcon, bleuIcon } from "../../Variable/LeafletVariable";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import { AnimationCarteContext } from "../../Context/AnimationCarteContext";
import { carteReunionPointSeul } from "../../Variable/GeoReunionJSON";
import { PointMilieuListeCoordonne } from "../../Fonction/Fonction";
import "./CarteLeaflet.scss";

const PointerMap = ({ info, flagHover }) => {
  const { setPointerCarteHover, pointerCarteHover } = useContext(
    AnimationCarteContext
  );

  const { OnclickCardElement } = useContext(GestionContext);

  const OnHoverMouse = () => {
    setPointerCarteHover(info._id);
  };

  const LeaveHoverMouse = () => {
    setPointerCarteHover(false);
  };

  return (
    <Marker
      position={[info.latitude, info.longitude]}
      key={info._id}
      icon={
        flagHover || info._id === pointerCarteHover
          ? blackIcon
          : info.type === "Lieu"
          ? bleuIcon
          : greenIcon
      }
      eventHandlers={{
        mouseover: (event) => OnHoverMouse(),
        mouseout: (event) => LeaveHoverMouse(),
      }}
    >
      <Popup keepInView>
        <div
          className="card-pointer"
          onMouseEnter={OnHoverMouse}
          onMouseLeave={LeaveHoverMouse}
          onClick={() => OnclickCardElement(info)}
        >
          <p>{info.nom}</p>
          <img src={info.urlImageCard} alt={info.nom} />
        </div>
      </Popup>
      <Tooltip direction="bottom" offset={[1, -10]} opacity={1} permanent>
        {info.nom}
      </Tooltip>
    </Marker>
  );
};

const MapControl = ({ ville }) => {
  const map = useMap();
  useEffect(() => {
    if (ville === "All") {
      map.setView([-21.13, 55.53], 10);
    } else {
      map.setView(PointMilieuListeCoordonne(carteReunionPointSeul[ville]), 12);
    }
  }, [ville, map]);
  return null;
};

const CarteLeaflet = ({ listeElementVue, pageActuel, ville }) => {
  const { cardHover } = useContext(AnimationCarteContext);

  return (
    <MapContainer
      center={[-21.13, 55.53]}
      zoom={10}
      scrollWheelZoom={true}
      className="carte-liflet"
    >
      <MapControl ville={ville} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ville === "All" ? (
        Object.keys(carteReunionPointSeul).map((commune) => (
          <Polyline
            pathOptions={{ fillColor: "blue" }}
            positions={carteReunionPointSeul[commune]}
            key={commune}
          />
        ))
      ) : (
        <Polyline
          pathOptions={{ fillColor: "blue" }}
          positions={carteReunionPointSeul[ville]}
        />
      )}

      {listeElementVue.length > 0 &&
        listeElementVue[pageActuel - 1].map((element) =>
          cardHover === element._id ? (
            <PointerMap info={element} flagHover={true} key={element._id} />
          ) : (
            <PointerMap info={element} flagHover={false} key={element._id} />
          )
        )}
    </MapContainer>
  );
};

export default CarteLeaflet;
