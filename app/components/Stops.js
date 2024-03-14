"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Stop = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentLocation();
        const cafesData = await fetchNearbyCafes(
          position.coords.latitude,
          position.coords.longitude
        );

        setCafes(
          cafesData.slice(0, 4).map((cafe) => ({
            ...cafe,
            distance: calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              cafe.latitude,
              cafe.longitude
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };

    fetchData();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const fetchNearbyCafes = async (latitude, longitude) => {
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,${latitude},${longitude})[amenity=cafe];out;`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.elements.map((place) => ({
      name: place.tags.name || "Unnamed Cafe",
      latitude: place.lat,
      longitude: place.lon,
    }));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km rounded to 2 decimal places
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className={"m-auto w-full max-w-5xl p-5"}>
      <div>
        <h2>Nearby:</h2>
        <div>
          <div>
            {cafes.length > 0 ? (
              <ul>
                {cafes.map((cafe, index) => (
                  <li key={index}>
                    <Link href="https://buy.stripe.com/bIY16e04T5wZb3qcMM">
                      <div className="cafe-links m-auto w-full max-w-5xl _welcome__sneakpeak__block__item_1569r_124">
                        <div className="_welcome__sneakpeak__block__item__domain_1569r_184 place-list-name">
                          <span>{cafe.name}</span>
                        </div>
                        <div className="_welcome__sneakpeak__block__item__data_1569r_195 place-list-info">
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Open</span>
                            <p>{cafe.openingHours ? "Open" : "Closed"}</p>
                          </div>
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Distance</span>
                            <p>{cafe.distance} km</p>
                          </div>
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Amenities</span>
                            <p>Upgrade</p>
                          </div>
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Community</span>
                            <p>Upgrade</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading workspaces...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stop;
