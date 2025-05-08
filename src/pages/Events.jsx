// src/pages/Events.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Events = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city = "" } = location.state || {};

  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(false);

  const mockSports = [
    "⚾ Yankees vs Mets – Tonight 7:05 PM",
    "🏀 Celtics beat Heat – Final 112–106",
    "🏈 Chiefs vs Bills – Sunday 8:20 PM",
  ];

  const mockEvents = [
    "🍷 Wine & Paint Night at The Palette Bar",
    "🎶 Live Jazz at The Blue Note Lounge",
    "🌮 Taco Fest 2025 – Downtown Plaza",
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!city || !apiKey) {
        setWeatherError(true);
        return;
      }

      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
          setWeather(data);
        } else {
          setWeatherError(true);
        }
      } catch (error) {
        setWeatherError(true);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-midnight p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-6">What’s Happening Tonight ✨</h1>

        {city && !weatherError && weather?.current ? (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-1">🌤️ Weather in {city}</h2>
            <p>{weather.current.temp_f}°F — {weather.current.condition.text}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-1">🌤️ Weather</h2>
            <p className="text-gray-600 italic">Weather not available — but date night is still on!</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">🏟️ Major Matchups</h2>
          <ul className="list-disc list-inside">
            {mockSports.map((game, i) => (
              <li key={i}>{game}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">🎉 Local Vibes</h2>
          <ul className="list-disc list-inside">
            {mockEvents.map((event, i) => (
              <li key={i}>{event}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/news", { state: { city } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to News
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
