"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";

const Test = () => {
  const [coworkingSpots, setCoworkingSpots] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 }); // Initialize with default values to prevent undefined error

  const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          { timeout: 10000 }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }, []);

  const fetchNearbyPlaces = useCallback(async (latitude, longitude) => {
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,${latitude},${longitude})[amenity=cafe];out;`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data.elements.map((place) => ({
        name: place.tags.name || "Unnamed Coworking Space",
        latitude: place.lat,
        longitude: place.lon,
        type: "cafe"
      }));
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    getCurrentLocation()
      .then(position => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }))
      .catch(error => {
        console.error("Error fetching user location:", error);
        setUserLocation({ lat: 0, lng: 0 }); // Set default location on error to prevent undefined error
      });
  }, [getCurrentLocation]);

  useEffect(() => {
    if (userLocation.lat !== 0 && userLocation.lng !== 0) { // Check if userLocation is not default value before fetching
      fetchNearbyPlaces(userLocation.lat, userLocation.lng)
        .then(spots => setCoworkingSpots(spots))
        .catch(error => console.error("Failed to fetch coworking spots:", error));
    }
  }, [userLocation, fetchNearbyPlaces]);

  if (!userLocation || (userLocation.lat === 0 && userLocation.lng === 0)) return <div>Loading your map...</div>; // Check if userLocation is default value

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "auto", margin: "auto", borderRadius: "15px", filter: "grayscale(80%)" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coworkingSpots.map((spot, index) => (
        <Marker key={index} position={[spot.latitude, spot.longitude]} icon={customIcon}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Test;
