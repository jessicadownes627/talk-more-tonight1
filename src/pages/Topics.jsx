import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import energyThemes from "../data/energyThemes";
import PageHeader from "../components/PageHeader";


const topicSections = {
  "Smart & Curious 🧠": [
    "Politics 🗳️",
    "Tech & Gadgets 💻",
    "Travel 🌍",
    "Food & Drinks 🥓",
    "Dating & Relationships ❤️",
    "Business & Money 💼"
  ],
  "Culture & Entertainment 🎬": [
    "Film 🎬",
    "TV & Streaming 📺",
    "Reality TV 💅",
    "Celebrity News 🌟",
    "Music 🎵",
    "Fashion 👗",
    "Shopping 🛍️",
    "Video Games 🎮"
  ],
  "Sports 🏆": [
    "Football 🏈",
    "Basketball 🏀",
    "Baseball ⚾",
    "Hockey 🏒",
    "College Sports 🎓",
    "Golf ⛳"
  ],
  "What’s Hot 🔥": [
    "Award Shows 🏆",
    "Major Races 🐎",
    "Festivals 🎊",
    "TV Finales 📺",
    "Celebrity Scandals 🔥",
    "Pop Culture Buzz 💥",
    "Weird Holidays 🧁",
    "Astrology 🧿"
  ]
};

const valueMap = {
  "Politics 🗳️": "Politics 🗳️",
  "Tech & Gadgets 💻": "Tech & Gadgets 🖥️",
  "Travel 🌍": "Travel 🌍",
  "Food & Drinks 🥓": "Food & Drinks 🥓",
  "Dating & Relationships ❤️": "Dating & Relationships ❤️",
  "Business & Money 💼": "Business & Money 💼",
  "Film 🎬": "Film 🎬",
  "TV & Streaming 📺": "TV Finales 📺",
  "Reality TV 💅": "Reality TV 💅",
  "Celebrity News 🌟": "Pop Culture Buzz 💥",
  "Music 🎵": "Pop Culture Buzz 💥",
  "Fashion 👗": "Fashion 👗",
  "Shopping 🛍️": "Pop Culture Buzz 💥",
  "Video Games 🎮": "Pop Culture Buzz 💥",
  "Football 🏈": "Football 🏈",
  "Basketball 🏀": "Basketball 🏀",
  "Baseball ⚾": "Baseball ⚾",
  "Hockey 🏒": "Hockey 🏒",
  "College Sports 🎓": "College Sports 🎓",
  "Golf ⛳": "Wildcard 🤔",
  "Award Shows 🏆": "Trending Events 🎉",
  "Major Races 🐎": "Trending Events 🎉",
  "Festivals 🎊": "Trending Events 🎉",
  "TV Finales 📺": "TV Finales 📺",
  "Celebrity Scandals 🔥": "Pop Culture Buzz 💥",
  "Pop Culture Buzz 💥": "Pop Culture Buzz 💥",
  "Weird Holidays 🧁": "Trending Events 🎉",
  "Astrology 🧿": "Astrology 🪐"
};

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUser();
  const { energy = "Dreamy ✨" } = userData;
  const theme = energyThemes[energy];

  const { name: userName = "J", dateName = "your date", city = "", zip = "" } = userData;
  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleNext = () => {
    const mappedTopics = selectedTopics.map((label) => valueMap[label] || label);
    const wildcardIndex = mappedTopics.indexOf("Wildcard Convo 💬");
    if (wildcardIndex !== -1) {
      const allLabels = Object.values(topicSections).flat();
      const randomLabel = allLabels[Math.floor(Math.random() * allLabels.length)];
      mappedTopics[wildcardIndex] = valueMap[randomLabel] || randomLabel;
    }

    navigate("/tonightstalktips", {
      state: { userName, dateName, city, zip, topics: mappedTopics }
    });
  };

  const wildcardSelected = selectedTopics.includes("Wildcard Convo 💬");

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-10">
          {userName}, what is your date into...? <span className="italic">Besides YOU! 😉</span>
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

        {selectedTopics.length > 6 && (
          <div className="text-center text-pink-700 font-medium mb-6 text-lg">
            Whoa 😅 You’re ready to talk all night! Want to narrow it down to your top 5 or 6?
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to Home
          </button>
          <button
            onClick={handleNext}
            className={`${theme.button} text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform`}
          >
            Next Up: Tonight's Talk Tips →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topics;
