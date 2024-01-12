import { useState } from "react";
import { Marker, Popup, useMapEvent} from "react-leaflet";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNewSpotPosition } from "../slices/newSpotPositionSlice";

function NewSpotPopup(props) {
  const dispatch = useDispatch()
  const newPosition = useSelector((state => state.newSpotPosition))
  const map = useMapEvent({
    click(e) {
      let newLatLng = {
        ...e.latlng
      }
      dispatch(setNewSpotPosition(newLatLng))
    }
  })
  return newPosition.value == null ? null : (
    <Popup position={newPosition.value}>
      <Link to="/newSpot"><button className="add-spot-button" >Add Spot</button></Link>
    </Popup>
  );
}

export default NewSpotPopup;