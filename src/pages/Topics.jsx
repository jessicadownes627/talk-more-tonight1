import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const allTopics = [
  "Baseball (MLB)",
  "Basketball (NBA)",
  "Football (NFL)",
  "Hockey (NHL)",
  "Politics",
  "Pop Culture",
  "TV + Streaming",
  "Music",
  "Tech + AI",
  "Food + Drink",
  "Fashion",
  "Fitness + Sports",
  "Dating + Relationships",
  "Travel",
  "Books + Lit",
  "Gaming",
  "Memes + Trends"
];

export default function Topics() {
  const { user, setSelectedTopics, setCustomTopic } = useUserContext();
  const [selected, setSelected] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const navigate = useNavigate();

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleNext = () => {
    setSelectedTopics(selected);
    setCustomTopic(customInput.trim());
    navigate("/TonightsTalkTips");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-400 p-8 font-poppins text-midnight">
      <h1 className="text-4xl font-bold mb-4 text-center">
        💖 What’s {user.dateName || "your date"} into? Besides YOU! 😉
      </h1>
      <p className="text-center mb-6">Pick a few things that get them chatting!</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {allTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`px-4 py-2 rounded-2xl shadow-md transition-all duration-200 font-medium border-2 text-center text-sm md:text-base whitespace-nowrap
              ${selected.includes(topic)
                ? "bg-white bg-opacity-80 border-midnight text-midnight"
                : "bg-white bg-opacity-30 border-white text-white hover:bg-white hover:text-midnight"}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-semibold">💬 Got something specific in mind?</label>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Type your own topic..."
          className="w-full p-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-midnight"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="bg-pink-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-pink-600"
        >
          ⬅️ Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-600"
        >
          Next: Talk Tips ✨
        </button>
      </div>
    </div>
  );
}
