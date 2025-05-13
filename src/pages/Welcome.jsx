import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();

  const [name, setName] = useState(userData.name);
  const [dateName, setDateName] = useState(userData.dateName);
  const [city, setCity] = useState(userData.city);
  const [state, setState] = useState(userData.state);
  const [zip, setZip] = useState(userData.zip);
  const [energy, setEnergy] = useState(userData.energy || "Dreamy ✨");

  const handleStart = () => {
    setUserData({ ...userData, name, dateName, city, state, zip, energy });
    navigate("/topics");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-70 p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-script text-midnight mb-2">Talk More Tonight</h1>
        <div className="text-yellow-500 text-xl mb-2">✨</div>
        <p className="text-midnight italic mb-6">
          A dreamy dating concierge — for what to say, what to plan, and how to talk more tonight.
        </p>

        <div className="space-y-3">
  <input
    type="text"
    placeholder="Your name"
    className="w-full p-3 rounded-md text-midnight focus:outline-none focus:ring-2 focus:ring-purple-400"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Date's name (optional)"
    className="w-full p-3 rounded-md text-midnight focus:outline-none focus:ring-2 focus:ring-purple-400"
    value={dateName}
    onChange={(e) => setDateName(e.target.value)}
  />
  <input
    type="text"
    placeholder="City"
    className="w-full p-3 rounded-md text-midnight focus:outline-none focus:ring-2 focus:ring-purple-400"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  <input
    type="text"
    placeholder="State (e.g., NY)"
    className="w-full p-3 rounded-md text-midnight focus:outline-none focus:ring-2 focus:ring-purple-400"
    value={state}
    onChange={(e) => setState(e.target.value)}
  />
  <input
    type="text"
    placeholder="ZIP Code"
    className="w-full p-3 rounded-md text-midnight focus:outline-none focus:ring-2 focus:ring-purple-400"
    value={zip}
    onChange={(e) => setZip(e.target.value)}
  />
</div>


        <div className="mt-6">
          <p className="text-midnight font-semibold mb-2">✨Choose your Energy ✨</p>
          <div className="flex justify-center space-x-2">
            <button
              className={`px-4 py-2 rounded-full border ${energy === "Dreamy ✨" ? "bg-purple-100 border-purple-400" : "bg-white border-gray-300"}`}
              onClick={() => setEnergy("Dreamy ✨")}
            >
              Dreamy ✨
            </button>
            <button
              className={`px-4 py-2 rounded-full border ${energy === "Bold 🔥" ? "bg-yellow-100 border-yellow-400" : "bg-white border-gray-300"}`}
              onClick={() => setEnergy("Bold 🔥")}
            >
              Bold 🔥
            </button>
            <button
              className={`px-4 py-2 rounded-full border ${energy === "Chill 🌙" ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}`}
              onClick={() => setEnergy("Chill 🌙")}
            >
              Chill 🌙
            </button>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-6 w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-full text-lg font-semibold shadow-md"
        >
          Let’s Talk
        </button>
      </div>
    </div>
  );
};

export default Welcome;
