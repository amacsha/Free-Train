import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import customPin from "../assets/map-pin.svg";
import customPinTwo from "../assets/not-owned-pin.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Spot } from "../types/spot";
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

function SpotMarker({ spot }: { spot: Spot }) {
  let user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Marker
        position={spot}
        icon={spot.author == user.value ? ownedIcon : notOwnedIcon}
      >
        <Popup className="Popup">
          <div id="spot-marker">
            <img
              src={spot.imagePaths[0]}
              width="50px"
            />
            <div className="marker-more-div">
              <h5>{spot.name}</h5>

              <Link to={`/spotExpanded/${spot.name}`}>
                <button>Show More</button>
              </Link>
            </div>
          </div>
        </Popup>
      </Marker>
    </div>
  );
}

export default SpotMarker;
