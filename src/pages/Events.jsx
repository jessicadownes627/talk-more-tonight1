import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Events = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city = "", zip = "" } = location.state || {};

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

  const wouldYouRatherQuestions = [
    "Would you rather kiss on the first date or wait until the third?",
    "Would you rather share dessert or order your own?",
    "Would you rather flirt over text or face-to-face?",
    "Would you rather have sparks or comfort right away?",
    "Would you rather go on a mystery date or plan the whole thing?",
    "Would you rather have a rooftop date or a beach walk?",
    "Would you rather match music tastes or food tastes?",
    "Would you rather fight one horse-sized duck or 100 duck-sized horses?",
    "Would you rather always have to sing instead of speak or dance everywhere you go?",
    "Would you rather be stuck in a rom-com or an action movie for a day?",
    "Would you rather only eat tacos or only eat pizza for the rest of your life?",
    "Would you rather time travel to the past or the future?",
    "Would you rather have a rewind button or a pause button for your life?",
    "Would you rather be famous for something embarrassing or unknown for something amazing?"
  ];

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = [...wouldYouRatherQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey || (!city && !zip)) {
        setWeatherError(true);
        return;
      }

      const query = zip ? zip : `${city},US`; // Use ZIP if available, fallback to city
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
          setWeather({
            temp: data.current.temp_f,
            condition: data.current.condition.text,
          });
          setWeatherError(false);
        } else {
          setWeatherError(true);
        }
      } catch (error) {
        console.error("Weather API failed:", error);
        setWeatherError(true);
      }
    };

    fetchWeather();
  }, [city, zip]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-midnight p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-6">What’s Happening Tonight ✨</h1>

        {city && !weatherError && weather ? (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-1">🌤️ Weather in {city}{zip ? `, ${zip}` : ""}</h2>
            <p>{weather.temp}°F — {weather.condition}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-1">🌤️ Weather</h2>
            <p className="text-gray-600 italic">Couldn’t fetch the weather — but the night’s still full of possibilities. ✨</p>
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

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">🌀 Would You Rather…?</h2>
          <p className="text-gray-700 italic mb-2">If all else fails, these will save the convo 😏</p>
          <ul className="list-disc list-inside">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <button
            onClick={shuffleQuestions}
            className="mt-4 text-purple-600 hover:text-pink-600 underline transition-all"
          >
            🔁 Shuffle Questions
          </button>
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/news", { state: { city, zip } })}
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
