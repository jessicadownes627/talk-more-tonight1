// src/pages/Topics.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const topicSections = {
  "Smart & Curious 🧠": [
    "Politics 🗳️",
    "Tech & Gadgets 💻",
    "Travel 🌍",
    "Food & Drinks 🥓",
    "Dating & Relationships ❤️",
    "Business & Money 💼",
  ],
  "Culture & Entertainment 🎬": [
    "Film 🎬",
    "TV & Streaming 📺",
    "Reality TV 💅",
    "Celebrity News 🌟",
    "Music 🎵",
    "Fashion 👗",
    "Shopping 🛍️",
    "Video Games 🎮",
  ],
  "Sports 🏆": [
    "Football 🏈",
    "Basketball 🏀",
    "Baseball ⚾",
    "Hockey 🏒",
    "College Sports 🎓",
    "Golf ⛳",
  ],
  "What’s Hot 🔥": [
    "Award Shows 🏆",
    "Major Races 🐎",
    "Festivals 🎊",
    "TV Finales 📺",
    "Celebrity Scandals 🔥",
    "Pop Culture Buzz 💥",
    "Weird Holidays 🧁",
    "Astrology 🧿",
  ],
};

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName = "J", dateName = "your date", city = "" } = location.state || {};

  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleNext = () => {
    const actualTopics = [...selectedTopics];
    const wildcardIndex = actualTopics.indexOf("Wildcard Convo 💬");

    if (wildcardIndex !== -1) {
      const allTopics = Object.values(topicSections).flat();
      const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
      actualTopics[wildcardIndex] = randomTopic;
    }

    navigate("/tonightstalktips", {
      state: { userName, dateName, city, topics: actualTopics },
    });
  };

  const wildcardSelected = selectedTopics.includes("Wildcard Convo 💬");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-200 to-blue-200 text-midnight p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-10">
          {userName}, what is your date into... <span className="italic">besides YOU! 😉</span>
        </h1>

        {Object.entries(topicSections).map(([section, topics]) => (
          <div key={section} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{section}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <label
                  key={topic}
                  className={`flex items-center px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer ${
                    selectedTopics.includes(topic)
                      ? "bg-white border-2 border-purple-400"
                      : "bg-white bg-opacity-90"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="mr-2 h-4 w-4 text-purple-600"
                  />
                  {topic}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Wildcard Convo Separate Box */}
        <div className="mt-10 mb-10">
          <h2 className="text-xl font-bold mb-2">❓ Not sure what to talk about tonight?</h2>
          <label
            className={`block px-6 py-4 rounded-lg text-lg font-medium text-center shadow-md cursor-pointer transition-all ${
              wildcardSelected
                ? "bg-white border-2 border-purple-400"
                : "bg-white bg-opacity-90"
            }`}
          >
            <input
              type="checkbox"
              checked={wildcardSelected}
              onChange={() => toggleTopic("Wildcard Convo 💬")}
              className="mr-2 h-5 w-5 text-purple-600"
            />
            🎲 Wildcard Convo 💬 — We’ll surprise you!
          </label>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to Home
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Next Up: Tonight's Talk Tips →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topics;
