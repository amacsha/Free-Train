import { Popup, useMapEvent } from "react-leaflet";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setNewSpotPosition } from "../slices/newSpotPositionSlice";

function NewSpotPopup(props) {
  //functional hooks
  const dispatch = useDispatch();

  //global states
  const newPosition = useSelector((state) => state.newSpotPosition);

  //when the map is clicked the global new position state is set
  const map = useMapEvent({
    click(e) {
      let newLatLng = {
        ...e.latlng,
      };
      dispatch(setNewSpotPosition(newLatLng));
    },
  });

  //only if the newPosition is set will the element is displayed
  return newPosition.value == null ? null : (
    <Popup position={newPosition.value}>
      <Link to="/newSpot">
        <button className="add-spot-button">Add Spot</button>
      </Link>
    </Popup>
  );
}

export default NewSpotPopup;
