"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js/Leaflet
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerProps {
    onLocationSelect: (location: string, lat: number, lng: number) => void;
    defaultLocation?: { lat: number, lng: number };
}

function LocationMarker({ onSelect, defaultPos }: { onSelect: (lat: number, lng: number) => void, defaultPos: [number, number] }) {
    const [position, setPosition] = useState<[number, number]>(defaultPos);

    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={icon} />
    );
}

export default function MapPicker({ onLocationSelect, defaultLocation }: MapPickerProps) {
    const defaultPos: [number, number] = defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : [51.505, -0.09]; // Default to London

    const handleSelect = async (lat: number, lng: number) => {
        // Basic reverse geocoding via Nominatim (OSM)
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await res.json();
            const addressName = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            onLocationSelect(addressName, lat, lng);
        } catch (e) {
            // Fallback
            onLocationSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng);
        }
    };

    return (
        <div className="h-[300px] w-full rounded-md overflow-hidden border border-slate-300 z-0 relative">
            <MapContainer center={defaultPos} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onSelect={handleSelect} defaultPos={defaultPos} />
            </MapContainer>
        </div>
    );
}
