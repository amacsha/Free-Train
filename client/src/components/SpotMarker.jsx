import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from 'leaflet'
import customPin from '../assets/map-pin.svg'
import customPinTwo from '../assets/not-owned-pin.svg'
import { useSelector } from "react-redux";

const ownedIcon = new L.Icon({
  iconUrl: customPin, // Replace with the path to your custom icon image
  iconSize: [25, 41], // Adjust the icon size as needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const notOwnedIcon = new L.Icon({
  iconUrl: customPinTwo, // Replace with the path to your custom icon image
  iconSize: [25, 41], // Adjust the icon size as needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function SpotMarker(props) {
  let user = useSelector(state => state.user)

  return ( 
    <div>
      <Marker position={props.spot} icon={props.spot.author == user.value ? ownedIcon : notOwnedIcon}>
        <Popup>
          <div id="spot-marker">
            <h5>{props.spot.name}</h5>
            <img src={`http://localhost:3000/spot/getImage/${props.spot.name}/${props.spot.imagePaths[0]}`} width="50px"/>
            <Link to={`/spotExpanded/${props.spot.name}`}><button>More</button></Link>
          </div>
        </Popup>
      </Marker>
    </div>
   );
}

export default SpotMarker;