"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from 'lodash/debounce';
import { Icon } from "leaflet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import espresso from "@/public/espresso.svg";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const DynamicTileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const DynamicMarker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
const DynamicPopup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });

import "leaflet/dist/leaflet.css";

interface CoworkingSpot {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  region: string;
  price: string;
  userImage: string;
}

const Test = () => {
  const [coworkingSpots, setCoworkingSpots] = useState<CoworkingSpot[]>([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [checkedInSpots, setCheckedInSpots] = useState<CoworkingSpot[]>([]);
  const [savedSpots, setSavedSpots] = useState<CoworkingSpot[]>([]); // Define savedSpots state here

  useEffect(() => {
    const checkedInSpotsLocal = JSON.parse(localStorage.getItem('checkedInSpots') || '[]');
    setCheckedInSpots(checkedInSpotsLocal);
  }, []);

  const checkInPlace = useCallback((spot: CoworkingSpot) => {
    const newCheckedInSpots = [...checkedInSpots, spot];
    localStorage.setItem('checkedInSpots', JSON.stringify(newCheckedInSpots));
    setCheckedInSpots(newCheckedInSpots);
  }, [checkedInSpots]);

  const removeCheckIn = useCallback((spotToRemove: CoworkingSpot) => {
    const updatedCheckedInSpots = checkedInSpots.filter(spot => spot.latitude !== spotToRemove.latitude || spot.longitude !== spotToRemove.longitude);
    localStorage.setItem('checkedInSpots', JSON.stringify(updatedCheckedInSpots));
    setCheckedInSpots(updatedCheckedInSpots);
  }, [checkedInSpots]);

  const icons = useMemo(() => {
    const L = typeof window !== "undefined" ? require("leaflet") : null;
    if (L) {
      const baseIconStyle = `
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF;
      `;
      const customIcon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [22.5, 45],
        popupAnchor: [-3, -45],
        html: `<span style="${baseIconStyle} background-color: #FA7417;" />`
      });

      const checkedInIcon = L.divIcon({
        className: "my-checked-in-pin",
        iconAnchor: [22.5, 45],
        popupAnchor: [-3, -45],
        html: `<span style="${baseIconStyle} background-color: #34A853;" />`
      });

      return { customIcon, checkedInIcon };
    }
    return { customIcon: undefined, checkedInIcon: undefined };
  }, []);

  const fetchNearbyPlaces = useCallback(debounce(async (latitude: number, longitude: number) => {
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
        region: place.tags.city || "Unknown Region",
        price: typeof place.tags.price === 'string' || typeof place.tags.price === 'number' ? place.tags.price : "N/A",
        userImage: place.tags.image || "/placeholder.svg",
      }));
      setCoworkingSpots(prevSpots => [...prevSpots, ...places]);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setCoworkingSpots([]);
    }
  }, 300), []);

  const mapCenter = useMemo((): [number, number] => [userLocation.lat, userLocation.lng], [userLocation.lat, userLocation.lng]);

  useEffect(() => {
    const localSpots = JSON.parse(localStorage.getItem('coworkingSpots') || '[]');
    setCoworkingSpots(localSpots);
    const savedSpotsLocal = JSON.parse(localStorage.getItem('savedStops') || '[]');
    setSavedSpots(savedSpotsLocal);
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
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      fetchNearbyPlaces(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, fetchNearbyPlaces]);

  if (userLocation.lat === 0 && userLocation.lng === 0)
    return <div className="bold text-lg">Looking...</div>;

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "300px",
          width: "auto",
          margin: "auto",
          borderRadius: "12px",
          zIndex: "0",
        }}
      >
        <DynamicTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coworkingSpots.map((spot, index) => {
          const isSpotCheckedIn = checkedInSpots.some(s => s.latitude === spot.latitude && s.longitude === spot.longitude);
          const iconToUse = isSpotCheckedIn ? icons.checkedInIcon : icons.customIcon;

          return iconToUse ? (
            <DynamicMarker
              key={index}
              position={[spot.latitude, spot.longitude]}
              icon={iconToUse}
            >
              <DynamicPopup>
                <div style={{ minWidth: '200px' }}>
                  <strong>{spot.name}</strong><br />
                  Price: {spot.price}<br />
                  <a 
                    href={`https://www.google.com/maps/@${spot.latitude},${spot.longitude},3a,75y,90h,0t/data=!3m6!1e1!3m4!1s0x0:0x0!2z0JHRgNCw0YHQvdC40Y8!3m1!1e3`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginTop: '10px', display: 'inline-block', textDecoration: 'underline', color: 'var(--brand-color)' }}
                  >
                    Visit
                  </a>
                  {checkedInSpots.some(s => s.latitude === spot.latitude && s.longitude === spot.longitude) ? (
                    <button className="pl-2 add p-2 ml-2 border-radius" onClick={() => removeCheckIn(spot)} style={{ marginTop: '10px' }}>Check Out</button>
                  ) : (
                    <button className="pl-2 add p-2 ml-2 border-radius" onClick={() => checkInPlace(spot)} style={{ marginTop: '10px' }}>Check In</button>
                  )}
                  {checkedInSpots.some(s => s.latitude === spot.latitude && s.longitude === spot.longitude) && (
                    <Avatar className="h-10 w-10 mt-2 rounded-full border border-light">
                      <AvatarImage src={spot.userImage} alt="" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </DynamicPopup>
            </DynamicMarker>
          ) : null;
        })}
      </MapContainer>

      <div className="mt-4">
        <h2>Checked in:</h2>
        {checkedInSpots.map((spot, index) => (
          <div key={index} className="gap-5">
            <strong>{spot.name}</strong> - {spot.price}
            <button onClick={() => removeCheckIn(spot)} style={{ marginLeft: '10px', color: 'var(--brand-color)' }}>Check Out</button>
            <Avatar className="h-10 w-10 rounded-full border border-light">
              <AvatarImage src={spot.userImage} alt="" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
