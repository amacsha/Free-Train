import { useState } from "react";
import { Marker, Popup, useMapEvent} from "react-leaflet";


function NewSpotPopup(props) {
  const map = useMapEvent({
    click(e) {
      props.setNewSpotPosition(e.latlng)
    }
  })
  return props.newSpotPosition == null ? null : (
    <Popup position={props.newSpotPosition}>
      <button className="addSpotButton">Add Spot</button>
    </Popup>
  );
}

export default NewSpotPopup;