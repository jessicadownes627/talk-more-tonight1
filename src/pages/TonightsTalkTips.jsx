import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { promptData, genericFallbacks } from "../data/promptData";
import { useUser } from "../context/UserContext";
import energyThemes from "../data/energyThemes";
import PageHeader from "../components/PageHeader";


const TonightsTalkTips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], city = "", zip = "" } = location.state || {};
  const { userData } = useUser();
  const { energy = "Dreamy ✨" } = userData;
  const theme = energyThemes[energy];

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const uniqueTopics = [...new Set(topics)];

  const resolvedTopics = uniqueTopics.map((topic) => {
    if (topic === "Wildcard 🤔") {
      const eligible = Object.keys(promptData).filter(
        (key) => key !== "Wildcard 🤔" && key !== "Trending Events 🎉"
      );
      return getRandom(eligible);
    }
    return topic;
  });

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

  const [tips, setTips] = useState(resolvedTopics.map(buildTip));

  const shuffleTips = () => {
    setTips(resolvedTopics.map(buildTip));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
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
            onClick={() => navigate("/topics", { state: { city, zip } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/news", { state: { topics: resolvedTopics, city } })}
            className={`${theme.button} text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform`}
          >
            Next: Here's the Headlines →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TonightsTalkTips;


