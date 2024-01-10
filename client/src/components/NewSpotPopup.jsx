import { useState } from "react";
import { Marker, Popup, useMapEvent} from "react-leaflet";


function NewSpotPopup() {
  const [position, setPosition] = useState(null)
  const map = useMapEvent({
    click(e) {
      setPosition(e.latlng)
    }
  })
  return position == null ? null : (
    <Popup position={position}>
      <button className="addSpotButton">Add Spot</button>
    </Popup>
  );
}

export default NewSpotPopup;