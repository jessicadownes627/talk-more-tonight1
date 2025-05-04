// src/pages/Topics.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Topics = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState("");

  const topics = [
    { name: "Baseball (MLB)", emoji: "⚾" },
    { name: "Basketball (NBA)", emoji: "🏀" },
    { name: "Football (NFL)", emoji: "🏈" },
    { name: "Hockey (NHL)", emoji: "🏒" },
    { name: "Politics (Trump, 2025, debates)", emoji: "🏛️" },
    { name: "Travel & Vacations", emoji: "✈️" },
    { name: "Music (Taylor Swift, BTS, etc.)", emoji: "🎶" },
    { name: "Movies & TV Shows", emoji: "🎬" },
    { name: "Food & Drinks", emoji: "🍕" },
    { name: "Tech & Gadgets", emoji: "💻" },
    { name: "Fashion & Style", emoji: "👗" },
    { name: "Fitness & Health", emoji: "💪" },
    { name: "Books & Literature", emoji: "📚" },
    { name: "Dating & Relationships", emoji: "💘" },
    { name: "Social Media Trends", emoji: "📱" },
    { name: "Weekend Plans", emoji: "🌆" },
    { name: "Current Events", emoji: "📰" },
    { name: "Art & Culture", emoji: "🎨" },
    { name: "Animals & Pets", emoji: "🐶" },
    { name: "Environmental Issues", emoji: "🌍" },
    { name: "Hobbies & Interests", emoji: "🎮" },
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTopics((prevTopics) =>
      checked ? [...prevTopics, value] : prevTopics.filter((topic) => topic !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to the next page (TonightsTalkTips) and pass the selected topics and custom topic
    navigate("/tonightstalktips", {
      state: { selectedTopics, customTopic },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-midnight px-4 py-8 font-poppins">
      <div className="max-w-xl mx-auto bg-white bg-opacity-80 p-6 rounded-2xl shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-center" style={{ fontFamily: 'Bad Script, cursive', color: "#003366" }}>
          💫 Talk More Tonight 💫
        </h1>
        <h2 className="text-xl font-medium text-center mb-4" style={{ color: "#003366" }}>
          Hey {user.name}, let's talk about {user.dateName} 😏
        </h2>
        <h3 className="text-lg text-center mb-8" style={{ color: "#003366" }}>
          What's {user.dateName} into...? Besides you? 😜
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" style={{ color: "#003366" }}>
              Pick some fun topics to get to know {user.dateName} better! 🎉
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div
                  key={topic.name}
                  className="flex items-center border-2 border-gray-300 p-3 rounded-lg shadow-sm hover:bg-pink-200 transition"
                >
                  <input
                    type="checkbox"
                    id={topic.name}
                    value={topic.name}
                    onChange={handleCheckboxChange}
                    className="mr-3"
                  />
                  <label htmlFor={topic.name} className="text-lg flex items-center" style={{ color: "#003366" }}>
                    <span className="mr-2">{topic.emoji}</span>
                    {topic.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" style={{ color: "#003366" }}>
              Any specific topic you'd like to bring up? 💬
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Type your own topic here..."
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-2xl"
          >
            Let's Talk!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Topics;
