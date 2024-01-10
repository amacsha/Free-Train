import { useState } from "react";
import { Marker, Popup, useMapEvent} from "react-leaflet";
import { Link } from "react-router-dom";


function NewSpotPopup(props) {
  const map = useMapEvent({
    click(e) {
      props.setNewSpotPosition(e.latlng)
    }
  })
  return props.newSpotPosition == null ? null : (
    <Popup position={props.newSpotPosition}>
      <Link to="/newSpot"><button className="add-spot-button" >Add Spot</button></Link>
    </Popup>
  );
}

export default NewSpotPopup;