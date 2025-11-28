import React, { useEffect, useState } from "react";
import { getAllBikes } from "../store/services/bikeServices";

export default function BuyBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBikes();
  }, []);

  const loadBikes = async () => {
    try {
      setLoading(true);
      const data = await getAllBikes();
      setBikes(data);
    } catch (err) {
      console.error("Failed to load bikes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* PAGE HEADER */}
      <h2 className="text-3xl font-bold mb-2">Browse Bikes</h2>
      <p className="text-gray-600 mb-6">
        Find your next bike from our wide selection of listings.
      </p>

      {loading ? (
        <p className="text-gray-700 text-lg">Loading bikes...</p>
      ) : bikes.length === 0 ? (
        <p className="text-gray-600">No bikes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike.bike_id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------
        BIKE CARD UI
-------------------------- */
function BikeCard({ bike }) {
  // Handle image — your backend returns a list of images: bike.images[]
  const imageUrl =
    bike.images?.[0]?.image_link ||
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-3">
      {/* IMAGE */}
      <div className="w-full h-44 overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={bike.brand}
          className="w-full h-full object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="mt-3 space-y-1">
        <h3 className="text-lg font-semibold">
          {bike.brand} {bike.model}
        </h3>

        <p className="text-gray-600 text-sm">
          Variant: <span className="font-medium">{bike.variant}</span>
        </p>

        <p className="text-gray-600 text-sm">
          Year: <span className="font-medium">{bike.manufactureYear}</span>
        </p>

        <p className="text-green-600 font-bold text-lg">
          ₹ {bike.prize?.toLocaleString()}
        </p>
      </div>

      {/* BUTTON */}
      <button
        className="w-full mt-3 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        onClick={() => alert("View bike details coming soon")}
      >
        View Details
      </button>
    </div>
  );
}
