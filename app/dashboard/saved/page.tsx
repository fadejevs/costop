"use client";

import React, { useEffect, useState } from "react";

interface CoworkingSpot {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  region: string;
  price: string;
}

const Saved = () => {
  const [savedSpots, setSavedSpots] = useState<CoworkingSpot[]>([]);

  useEffect(() => {
    const spots = JSON.parse(localStorage.getItem('savedSpots') || '[]');
    setSavedSpots(spots);
  }, []);

  return (
    <div>
      <h1>Saved Places</h1>
      {savedSpots.length > 0 ? (
        savedSpots.map((spot, index) => (
          <div key={index}>
            <strong>{spot.name}</strong><br />
            Price: {spot.price}<br />
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No saved places.</p>
      )}
    </div>
  );
};

export default Saved;
