// src/pages/TonightsTalkTips.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { promptData, genericFallbacks } from "../data/promptData";

const TonightsTalkTips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], city = "" } = location.state || {};

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const buildTip = (topic) => {
    const data = promptData[topic] || {};
    return {
      topic,
      summary: data.summary || "This topic could totally win someone over.",
      fact: getRandom(data.facts || genericFallbacks.facts),
      ask: getRandom(data.ask || genericFallbacks.ask),
      open: getRandom(data.open || genericFallbacks.open),
    };
  };

  const [tips, setTips] = useState(topics.map(buildTip));

  const shuffleTips = () => {
    setTips(topics.map(buildTip));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-midnight p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-10">
          Stay sharp, look cute — here’s what’s going on 😉
        </h1>

        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-90 rounded-xl shadow-md p-5 mb-6"
          >
            <h2 className="text-xl font-bold mb-2">{tip.topic}</h2>
            <p><span className="font-semibold">💡 What To Know:</span> {tip.summary}</p>
            <p><span className="font-semibold">✨ Fun Fact:</span> {tip.fact}</p>
            <p><span className="font-semibold">❓ What To Ask:</span> {tip.ask}</p>
            <p><span className="font-semibold">💬 Keep It Going:</span> {tip.open}</p>
          </div>
        ))}

        <div className="flex justify-center mb-10">
          <button
            onClick={shuffleTips}
            className="text-blue-700 underline hover:text-purple-600 transition-all"
          >
            🔁 Shuffle the Tips
          </button>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/topics", { state: { city } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/news", { state: { topics, city } })}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Next: Here's the Headlines →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TonightsTalkTips;
