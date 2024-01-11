import { Marker, Popup } from "react-leaflet";

function SpotMarker(props) {

  return ( 
    <div>
      <Marker position={props.spot}>
        <Popup>
          <h1>{props.spot.name}</h1>
        </Popup>
      </Marker>
    </div>
   );
}

export default SpotMarker;