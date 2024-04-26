"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import Placeholder from "/public/placeholder.svg";
import Image from "next/image";

const Stop = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNearbyCafes = async (latitude, longitude) => {
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,${latitude},${longitude})[amenity=cafe];out;`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.elements.map((place) => ({
      name: place.tags.name || "Unnamed Cafe",
      latitude: place.lat,
      longitude: place.lon,
      imageUrl: place.tags.image || null,
    }));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const fetchData = async () => {
    try {
      const position = await getCurrentLocation();
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const cafesData = await fetchNearbyCafes(
        position.coords.latitude,
        position.coords.longitude
      );

      const coffeeShopsElement = document.getElementById("coffee-shops");
      coffeeShopsElement.innerHTML = "";

      const nearestCafe = cafesData[0];

      if (nearestCafe) {
        const distance = calculateDistance(
          userLat,
          userLon,
          nearestCafe.latitude,
          nearestCafe.longitude
        );
        nearestCafe.distance = distance;
        const li = document.createElement("li");
        li.textContent = nearestCafe.name;
        coffeeShopsElement.appendChild(li);
      }

      const nearbyCafes = cafesData.slice(1, 4);
      nearbyCafes.forEach((cafe) => {
        const li = document.createElement("li");
        li.textContent = cafe.name;
        coffeeShopsElement.appendChild(li);
      });

      document.getElementById("available-places").textContent =
        cafesData.length + " places within your area";

      setPlaces(cafesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  // Dummy data
  useEffect(() => {
    const dummyData = [
      {
        name: "N/A",
        distance: "N/A",
        type: "N/A",
        locked: false,
      },
      { name: "N/A", distance: "N/A", type: "N/A", locked: true },
      {
        name: "N/A",
        distance: "N/A",
        type: "N/A",
        locked: true,
      },
      { name: "N/A", distance: "N/A", type: "N/A", locked: true },
    ];

    setTimeout(() => {
      setPlaces(dummyData);
      setLoading(false);
    }, 200);
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    if (!loading) {
      places.forEach((_, index) => {
        controls.start((i) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1 },
        }));
      });
    }
  }, [controls, loading, places]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={"m-auto w-auto max-w-5xl"}>
      <div className="links mt-5 mb-4 p-4 max-w-5xl">
        <h2>Close to you:</h2>
        <div>
          <div>
            {loading ? (
              <p>Wait here...</p>
            ) : (
              <ul>
                {places.slice(0, 4).map((place, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    className={`${index === 0 ? "" : "blur"}`}
                    custom={index}
                  >
                    <Link href={`https://costop.kinde.com/knock-knock`}>
                      <div className="cafe-links m-auto w-full max-w-5xl _welcome__sneakpeak__block__item_1569r_124">
                        <div className="_welcome__sneakpeak__block__item__domain_1569r_184 place-list-name">
                          <span>{place.name}</span>
                          <Image
                            src={place.imageUrl ? place.imageUrl : Placeholder}
                            alt={place.name}
                            height={40}
                            width={40}
                          />
                        </div>
                        <div className="_welcome__sneakpeak__block__item__data_1569r_195 place-list-info">
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Open</span>
                            <p>Yes</p>
                          </div>
                          <div className="_welcome__sneakpeak__block__item__data__item_1569r_209">
                            <span>Distance</span>
                            <p>{place.distance} km</p>{" "}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stop;
