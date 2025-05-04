import React from "react";

const Events = ({ city }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-midnight px-4 py-8 font-poppins">
      <div className="max-w-xl mx-auto bg-white bg-opacity-80 p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Local Events in {city}</h1>
        <p>Here are some exciting events near you:</p>
        <ul>
          <li>Concert at XYZ Venue - 8:00 PM</li>
          <li>Outdoor Market at ABC Park - 10:00 AM to 2:00 PM</li>
        </ul>
      </div>
    </div>
  );
};

export default Events;
