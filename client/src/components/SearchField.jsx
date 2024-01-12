//boilerplate code used from the leaflet-geosearch library can be found at https://github.com/smeijer/leaflet-geosearch


import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar', 
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default SearchField