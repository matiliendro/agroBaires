"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corregir el icono del marcador
const icon = L.icon({
  iconUrl: "/marker-icon.png", // Asegúrate de tener este archivo en tu carpeta public
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para manejar los clicks en el mapa
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (location: [number, number]) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const LocationMap = ({ 
  location, 
  onLocationSelect 
}: { 
  location?: [number, number] | null, 
  onLocationSelect: (location: [number, number]) => void 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const defaultLocation: [number, number] = [-34.603722, -58.381592]; // Buenos Aires
  const [mapCenter, setMapCenter] = useState(defaultLocation);

  useEffect(() => {
    setIsMounted(true);
    setMapCenter(location || defaultLocation);
  }, [location]);

  if (!isMounted) {
    return <div style={{ height: '300px', width: '100%', background: '#f0f0f0' }} />;
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <Marker position={location} icon={icon} />
        )}
        <MapClickHandler onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;