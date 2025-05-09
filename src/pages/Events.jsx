import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const mockEvents = [
  { category: "Nightlife 🌃", title: "Rooftop DJ Set & Cocktail Hour", time: "10:00 PM", url: "https://example.com/rooftop-party" },
  { category: "Food 🍽️", title: "Outdoor Street Food Festival", time: "6:00 PM", url: "https://example.com/food-fest" },
  { category: "Music 🎵", title: "Indie Pop Night at The Sound Lounge", time: "8:00 PM", url: "https://example.com/indie-night" }
];

const mockGames = [
  { idEvent: "1", strHomeTeam: "Yankees", strAwayTeam: "Red Sox", strTime: "7:10 PM", league: "MLB" },
  { idEvent: "2", strHomeTeam: "Heat", strAwayTeam: "Bulls", strTime: "8:00 PM", league: "NBA" },
  { idEvent: "3", strHomeTeam: "Rangers", strAwayTeam: "Bruins", strTime: "7:30 PM", league: "NHL" }
];

const wouldYouRatherPrompts = [
  {
    question: "Would you rather dress up fancy or keep it casual tonight?",
    suggestion: "Decide now — then plan where you're going to match the vibe."
  },
  {
    question: "Would you rather go somewhere spontaneous or stick to the plan?",
    suggestion: "If spontaneous wins, pick a neighborhood and just go explore."
  },
  {
    question: "Would you rather end the night with dessert or a walk under the stars?",
    suggestion: "Check for dessert bars or scenic spots nearby — either can end the night perfectly."
  },
  {
    question: "Would you rather go dancing or find a quiet bar to talk?",
    suggestion: "Let your mood guide the choice — bold or cozy?"
  },
  {
    question: "Would you rather plan a second date already or see how this one goes?",
    suggestion: "Hint at something fun you’d both look forward to — if it feels right."
  }
];

const finalQuestions = [
  {
    question: "What’s one thing you secretly hope happens tonight?",
    suggestion: "Answer it quietly or out loud — it sets the tone."
  },
  {
    question: "If this night had a theme song, what would it be?",
    suggestion: "Pick one together to play on the way. Let it soundtrack the vibe."
  },
  {
    question: "What’s your favorite way to end a perfect night out?",
    suggestion: "Plan the close before it sneaks up on you."
  },
  {
    question: "What kind of moment do you want to remember from tonight?",
    suggestion: "Think about it now — so you recognize it when it happens."
  },
  {
    question: "What would make this night unforgettable?",
    suggestion: "Make it happen — or ask how to make it happen together."
  }
];

const dateIdeas = [
  "🍦 Grab ice cream and people-watch at the park",
  "🌇 Catch golden hour at a rooftop lounge",
  "📚 Cozy up at a bookshop café",
  "🎧 Find a live music set or jazz bar",
  "🌿 Take a walk through the prettiest nearby neighborhood",
  "🎯 Play darts, arcade games, or try a bar with board games",
  "🖼️ Visit a quirky local gallery or pop-up exhibit",
  "🧋 Try bubble tea or a craft cocktail you’ve never had",
  "🌕 Go stargazing after dinner — even just a block away"
];

const Events = () => {
  const { userName, dateName, city } = useContext(UserContext);
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [wouldYouRather, setWouldYouRather] = useState({});
  const [finalQuestion, setFinalQuestion] = useState({});
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=imperial`);
        const data = await res.json();
        if (data.main) setWeather(data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };
    if (city) fetchWeather();
    shufflePrompt();
    shuffleFinalQuestion();
    shuffleIdeas();
  }, [city]);

  const getBestTime = () => {
    if (!weather) return "";
    const temp = weather.main.temp;
    if (temp > 80) return "After sunset will feel best 🌇";
    if (temp < 50) return "Bundle up! Earlier outings might be cozier ❄️";
    return "Anytime tonight should feel just right 🌤️";
  };

  const shufflePrompt = () => {
    const random = wouldYouRatherPrompts[Math.floor(Math.random() * wouldYouRatherPrompts.length)];
    setWouldYouRather(random);
  };

  const shuffleFinalQuestion = () => {
    const random = finalQuestions[Math.floor(Math.random() * finalQuestions.length)];
    setFinalQuestion(random);
  };

  const shuffleIdeas = () => {
    const shuffled = [...dateIdeas].sort(() => 0.5 - Math.random());
    setIdeas(shuffled.slice(0, 3));
  };

  const renderGame = (game) => (
    <li key={game.idEvent} className="flex items-center space-x-2">
      <span><strong>{game.strAwayTeam}</strong> vs <strong>{game.strHomeTeam}</strong> @ {game.strTime}</span>
      <a
        href={`https://www.espn.com/search/results?q=${encodeURIComponent(`${game.strAwayTeam} vs ${game.strHomeTeam}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-sm underline hover:text-pink-300"
      >
        See scores
      </a>
    </li>
  );

  const mlbGames = mockGames.filter((g) => g.league === "MLB");
  const nbaGames = mockGames.filter((g) => g.league === "NBA");
  const nhlGames = mockGames.filter((g) => g.league === "NHL");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-gray-900 text-white px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Date Night Plan, {userName} 💫</h1>
        <p className="text-center mb-6 text-white/80">Here’s what’s happening around {city} that {dateName} might love.</p>

        {/* Would You Rather with Suggestion */}
        <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">💭 Would You Rather...</h2>
          <p className="italic text-white/90">{wouldYouRather.question}</p>
          <p className="text-sm mt-2 text-pink-200">{wouldYouRather.suggestion}</p>
          <button
            onClick={shufflePrompt}
            className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm transition"
          >
            New Prompt 🔀
          </button>
        </div>

        {/* Weather */}
        {weather ? (
          <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">🌤️ Weather Forecast</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temp: {weather.main.temp}°F | Feels like: {weather.main.feels_like}°F</p>
            <p className="italic mt-2">{getBestTime()}</p>
          </div>
        ) : (
          <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl text-white/70 italic">
            Looking up weather... If it doesn’t load, bring a jacket just in case 😉
          </div>
        )}

        {/* Local Events */}
        <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🎟️ Local Events</h2>
          {mockEvents.map((event, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold">{event.category}</h3>
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-300">
                {event.title} – {event.time}
              </a>
            </div>
          ))}
        </div>

        {/* Date Ideas */}
        <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">💡 Ideas for Your Date</h2>
          <ul className="space-y-2 text-white/90">
            {ideas.map((idea, i) => (
              <li key={i}>• {idea}</li>
            ))}
          </ul>
          <button
            onClick={shuffleIdeas}
            className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm transition"
          >
            More Ideas 🔄
          </button>
        </div>

        {/* Matchups */}
        <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🏟️ Matchups of the Night</h2>
          {[mlbGames, nbaGames, nhlGames].map((league, i) => league.length > 0 && (
            <div key={i} className="mb-4">
              <ul className="space-y-1">{league.map(renderGame)}</ul>
            </div>
          ))}
        </div>

{/* Final Confidence Boost + Spark Question */}
<div className="bg-white bg-opacity-20 p-4 rounded-xl mb-6">
  <h2 className="text-xl font-semibold mb-2">💖 Before You Head Out</h2>

  <ul className="list-disc ml-6 space-y-1 text-white/90 text-sm mb-4">
    <li>You’re thoughtful. You’re curious. That already makes you stand out.</li>
    <li>You came prepared — and that’s more attractive than most people realize.</li>
    <li>Whatever happens tonight, you showed up ready. That counts.</li>
  </ul>

  <h3 className="font-semibold text-white/90 mb-1">Need a last-minute spark?</h3>
  <p className="italic text-pink-200 mb-3">Ask: “What’s something you’re surprisingly good at?”<br/>Or: “If you could meet anyone — living or not — who would it be, and why?”</p>

  <p className="text-center font-medium text-white mt-4 italic">Whatever the vibe is ... don’t forget to <span className="text-pink-300">talk more tonight</span>.</p>
</div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/news")}
            className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition"
          >
            🔁 Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
