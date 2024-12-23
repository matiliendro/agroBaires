"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const MapComponent = () => {
    useEffect(() => {
        // Cualquier inicialización que necesites hacer con Leaflet
    }, []);

    return (
        <MapContainer 
            center={[-34.6037, -58.3816]}
            zoom={12}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Tus markers y otros elementos del mapa aquí */}
        </MapContainer>
    );
};

export default MapComponent; 