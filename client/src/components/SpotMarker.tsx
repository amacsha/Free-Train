import { Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import customPin from "../assets/map-pin.svg";
import customPinTwo from "../assets/not-owned-pin.svg";
import customPinThree from "../assets/flashing.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import io, { Socket } from "socket.io-client";
import { Spot } from "../types/spot";

import './Popup.css'

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

const flashingIcon = new L.Icon({
  iconUrl: customPinThree, // Replace with the path to your custom icon image
  iconSize: [25, 41], // Adjust the icon size as needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function SpotMarker({ spot }: { spot: Spot }) {
  const map = useMap();
  const user = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isBeaconLit, setIsBeaconLit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [beaconRemainingTime, setBeaconRemainingTime] = useState(0);
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });

  // Function to calculate time remaining until beacon is no longer lit
  const calculateFutureTime = (timeLeftInMillis: any): any => {
    const futureTime = new Date(Date.now() + timeLeftInMillis);
    return futureTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    newSocket.on("initialBeaconState", (beacons) => {
      if (beacons[spot.name] && beacons[spot.name].lit) {
        const currentTime = Date.now();
        const litTimestamp = beacons[spot.name].timestamp;
        const duration = 60000; // add zeros for longer duration
        const timeLeft = litTimestamp + duration - currentTime;

        if (timeLeft > 0) {
          setIsBeaconLit(true);
          const newTimeoutId = setTimeout(() => {
            setIsBeaconLit(false);
          }, timeLeft);
          setTimeoutId(newTimeoutId);
          setBeaconRemainingTime(calculateFutureTime(timeLeft));
        }
      }
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // ... initialBeaconState handling
      console.log("connected");

      newSocket.on("beaconLit", (data) => {
        if (data.spotName === spot.name) {
          setIsBeaconLit(data.lit);

          // Clear any existing timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          // Set new timeout if beacon is lit
          if (data.lit) {
            setBeaconRemainingTime(calculateFutureTime(6000)); // add zeroes for longer run time

            const newTimeoutId = setTimeout(() => {
              setIsBeaconLit(false);
            }, 60000);
            setTimeoutId(newTimeoutId);
          }
        }
      });
    });

    return () => {
      newSocket.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [spot, timeoutId]);

  const handleMouseEnter = () => {
    if (isBeaconLit) {
      const markerPoint = map.latLngToContainerPoint(spot);
      setInfoPosition({ top: markerPoint.y, left: markerPoint.x });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Marker
          position={spot}
          icon={
            isBeaconLit
              ? flashingIcon
              : spot.author === user.value
                ? ownedIcon
                : notOwnedIcon
          }
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
              <button onClick={() => socket?.emit("lightTheBeacon", spot.name)}>
                Light The Beacon
              </button>
            </div>
          </div>
        </Popup>

          {isHovered && (
            <div
              className="beacon-remaining-time"
              style={{
                position: "absolute",
                top: `${infoPosition.top}px`,
                left: `${infoPosition.left}px`,
              }}
            >
              BEACON LIT UNTIL: {beaconRemainingTime}
            </div>
          )}
        </Marker>
      </div>
    </>
  );
}

export default SpotMarker;
