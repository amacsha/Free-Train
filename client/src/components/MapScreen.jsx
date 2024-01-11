import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import NewSpotPopup from './NewSpotPopup';
import SpotMarker from './spotMarker';
import SearchField from './SearchField';

function MapScreen(props) {
  return ( 
    <div id="map-screen">
      <MapContainer center={[51.505, -0.09]} zoom={12.6} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NewSpotPopup newSpotPosition={props.newSpotPosition} setNewSpotPosition={props.setNewSpotPosition}/>
        {props.spotList.map(spot => {
          return <SpotMarker spot={spot} key={spot.name}/>
        })}
        {props.search == false? null : <SearchField />}
      </MapContainer>
    </div>
  );
}

export default MapScreen;