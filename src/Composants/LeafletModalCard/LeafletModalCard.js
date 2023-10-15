import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./LeafletModalCard.scss"


const LeafletModalCard = ({ info }) => {
  return (
    <MapContainer center={[info.latitude, info.longitude]} zoom={13} scrollWheelZoom={false} className="leaflet-modal-card">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[info.latitude, info.longitude]}>
      </Marker>
    </MapContainer>
  );
};



export default LeafletModalCard