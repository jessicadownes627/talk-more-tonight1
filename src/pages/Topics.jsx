import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const topicSections = [
  {
    title: "🧠 Smart & Curious",
    topics: [
      { label: "Politics 🗳️", value: "politics" },
      { label: "Tech & Gadgets 💻", value: "tech" },
      { label: "Travel 🌍", value: "travel" },
      { label: "Food & Drinks 🍣", value: "food" },
      { label: "Dating & Relationships ❤️", value: "dating" },
      { label: "Business & Money 💼", value: "business" }, // NEW
    ],
  },
  {
    title: "🎬 Culture & Entertainment",
    topics: [
      { label: "Film 🎬", value: "film" },
      { label: "TV & Streaming 📺", value: "streaming" },
      { label: "Reality TV 💅", value: "reality tv" },
      { label: "Celebrity News 🌟", value: "celebrity" },
      { label: "Music 🎵", value: "music" },
      { label: "Fashion 👗", value: "fashion" },
      { label: "Shopping 🛍️", value: "shopping" },
      { label: "Video Games 🎮", value: "gaming" }, // NEW
    ],
  },
  {
    title: "🏆 Sports",
    topics: [
      { label: "Football 🏈", value: "nfl" },
      { label: "Basketball 🏀", value: "nba" },
      { label: "Baseball ⚾", value: "mlb" },
      { label: "Hockey 🏒", value: "nhl" },
      { label: "College Sports 🎓", value: "college sports" },
      { label: "Golf ⛳", value: "golf" }, // NEW
    ],
  },
  {
    title: "🔥 What's Hot",
    topics: [
      { label: "Award Shows 🏆", value: "award shows" },
      { label: "Major Races 🐎", value: "races" },
      { label: "Festivals 🎭", value: "festivals" },
      { label: "TV Finales 📺", value: "finales" },
      { label: "Celebrity Scandals 🔥", value: "celebrity drama" },
      { label: "Pop Culture Buzz 💥", value: "trending" },
      { label: "Weird Holidays 🧁", value: "national days" },
      { label: "Astrology 🔮", value: "astrology" },
    ],
  },
];

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState("");

  const userName = location.state?.userName || "";

  const toggleTopic = (value) => {
    setSelectedTopics((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleNext = () => {
    const topicsToPass = [...selectedTopics];
    if (customTopic.trim()) topicsToPass.push(customTopic.trim());
    navigate("/tonightstalktips", {
      state: {
        topics: topicsToPass,
        userName: userName,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 text-midnight p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-script text-center mb-6 drop-shadow-glow">
          {userName
            ? `${userName}, what is your date into… besides YOU? 😉`
            : "What is your date into… besides you? 😉"}
        </h1>

        {topicSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.topics.map((topic) => (
                <label
                  key={topic.value}
                  className="flex items-center bg-white bg-opacity-70 rounded-lg px-4 py-2 cursor-pointer hover:scale-105 transition-transform"
                >
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={selectedTopics.includes(topic.value)}
                    onChange={() => toggleTopic(topic.value)}
                  />
                  <span>{topic.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Custom topic input */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Other? Tell us! ✍️</h2>
          <input
            type="text"
            placeholder="Anything specific you're into?"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            disabled={selectedTopics.length === 0 && !customTopic.trim()}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topics;
