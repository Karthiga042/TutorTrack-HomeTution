import React from "react";
import "./CityCard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const CityCard = ({ city }) => {
  return (
    <div className="city-card">
      <Link to='/courses'>
      <img
        src={city.imageUrl}
        alt={`${city.name} skyline`}
        className="city-image"
      /></Link>
      <div className="city-details">
        <h2 className="city-name">{city.name}</h2>
        <p className="city-country">{city.country}</p>
        <p className="city-population">Population: {city.population}</p>
        <p className="city-description">{city.description}</p>
        <div className="city-map">
          <MapContainer
            center={city.coordinates}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={city.coordinates}>
              <Popup>{city.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
