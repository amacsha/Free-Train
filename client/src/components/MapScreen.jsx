import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import NewSpotPopup from './NewSpotPopup';
import SpotMarker from './spotMarker';
import SearchField from './SearchField';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setSpotListR } from '../slices/spotList';
import { useDispatch } from 'react-redux';
import auth from '../auth/auth';

function MapScreen() {
  const dispatch = useDispatch()
  let spotList = useSelector(state => state.spotListR)
  let search = useSelector(state => state.search)
  let user = useSelector(state => state.user)

  useEffect(() => {
    auth(user.value)
    axios.get("http://localhost:3000/spot/getAll").then(res => {
      dispatch(setSpotListR([...res.data]))
    })
  }, [])
  return ( 
    <div id="map-screen">
      <MapContainer center={[51.505, -0.09]} zoom={12.6} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NewSpotPopup />
        {spotList.value.map(spot => {
          return <SpotMarker spot={spot} key={spot.name}/>
        })}
        {search.value == false? null : <SearchField />}
      </MapContainer>
    </div>
  );
}

export default MapScreen;