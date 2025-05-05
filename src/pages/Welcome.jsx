import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [dateName, setDateName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    document.body.classList.add("fade-in");
  }, []);

  const handleStart = () => {
    navigate("/topics", {
      state: {
        userName,
        dateName,
        city,
      },
    });
  };
  

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex flex-col justify-center items-center text-center p-6 overflow-hidden">
      
      {/* Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulseSlow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-6xl font-script text-midnight mb-3 drop-shadow-glow">
          Talk More Tonight
        </h1>
        <p className="text-lg text-midnight italic mb-6">
          A quick and easy way to talk more tonight. A little magic and a lot of fun✨ Talk to Us before you talk to Them.
        </p>

        <div className="flex flex-col gap-4 w-full mb-8">
          <input
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white bg-opacity-80"
          />
          <input
            type="text"
            placeholder="Date's name"
            value={dateName}
            onChange={(e) => setDateName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white bg-opacity-80"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-80"
          />
        </div>

        <button
  onClick={handleStart}
  className="bg-white text-midnight font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
  disabled={!userName.trim()}
>
  {userName ? `Let’s Talk, ${userName} ✨` : "Let’s Talk ✨"}
</button>

      </div>
    </div>
  );
};

export default Welcome;
