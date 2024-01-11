import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function SpotMarker(props) {

  return ( 
    <div>
      <Marker position={props.spot}>
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