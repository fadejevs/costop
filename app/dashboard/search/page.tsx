"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

// Dynamically import the 'react-leaflet' components to avoid 'window is not defined' error during SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  { ssr: false }
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((module) => module.Popup),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";

interface CoworkingSpot {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
}

const Test = () => {
  const [coworkingSpots, setCoworkingSpots] = useState<CoworkingSpot[]>([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 }); // Initialize with default values

  // Define customIcon inside useEffect to ensure L is not called server-side and to address the 'any' type issue
  const [customIcon, setCustomIcon] = useState<Icon | null>(null);

  useEffect(() => {
    const L = typeof window !== "undefined" ? require("leaflet") : null;
    if (L) {
      setCustomIcon(
        new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/789/789012.",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        })
      );
    }
  }, []);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
          // Keep the default location if there's an error
        },
        {
          timeout: 10000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
      const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,${latitude},${longitude})[amenity=cafe];out;`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const places = data.elements.map((place: any) => ({
          name: place.tags.name || "Unnamed Coworking Space",
          latitude: place.lat,
          longitude: place.lon,
          type: "cafe",
        }));
        setCoworkingSpots(places);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
        setCoworkingSpots([]);
      }
    };

    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      // Check if the default location has been updated
      fetchNearbyPlaces(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  // Check if the map should be rendered based on userLocation being updated from default
  if (userLocation.lat === 0 && userLocation.lng === 0)
    return <div>Loading map...</div>;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "300px",
        width: "auto",
        margin: "auto",
        borderRadius: "15px",
        zIndex: "0",
      }}
    >
      <DynamicTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coworkingSpots.map((spot, index) => (
        <DynamicMarker
          key={index}
          position={[spot.latitude, spot.longitude]}
          icon={customIcon || undefined}
        >
          <DynamicPopup>{spot.name}</DynamicPopup>
        </DynamicMarker>
      ))}
    </MapContainer>
  );
};

export default Test;
