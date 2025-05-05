// COMPLETE TonightsTalkTips.jsx
// This file contains rotating tips for 18+ topics and supports custom user input
// Paste into src/pages/TonightsTalkTips.jsx in your React app

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { promptData, genericFallbacks } from "../data/promptData";

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const TonightsTalkTips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], userName = "" } = location.state || {};

  const handleBack = () => {
    navigate("/topics", { state: { userName } });
  };

  const handleNext = () => {
    navigate("/news", { state: { topics, userName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-midnight p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-script text-center mb-6 drop-shadow-glow">
          Confidence boost, coming right up 💫
        </h1>

        {topics.map((topic, i) => {
          const key = topic.toLowerCase();
          const prompt = promptData[key];

          const summary = prompt?.summary || "This topic could totally win someone over.";
          const fact = prompt ? getRandom(prompt.facts) : getRandom(genericFallbacks.facts);
          const ask = prompt ? getRandom(prompt.ask) : getRandom(genericFallbacks.ask);
          const open = prompt ? getRandom(prompt.open) : getRandom(genericFallbacks.open);

          return (
            <div
              key={i}
              className="bg-white bg-opacity-80 rounded-xl shadow-md p-5 mb-6"
            >
              <h2 className="text-2xl font-semibold mb-2 capitalize">{topic}</h2>
              <p><strong>💡 What it is:</strong> {summary}</p>
              <p><strong>✨ Fun fact:</strong> {fact}</p>
              <p><strong>❓ What to ask:</strong> {ask}</p>
              <p><strong>💬 Keep it going:</strong> {open}</p>
            </div>
          );
        })}

        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Get Headlines →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TonightsTalkTips;
