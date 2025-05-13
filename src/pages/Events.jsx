import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import energyThemes from "../data/energyThemes";
import PageHeader from "../components/PageHeader";

const fallbackIdeas = [
  "🍦 Grab ice cream and walk around your favorite area",
  "🌇 Catch golden hour at a rooftop or overlook",
  "🎯 Find a bar with arcade games, darts, or shuffleboard"
];

const sparkQuestions = [
  "What’s a weird skill you wish you had?",
  "If you had to eat one meal for the rest of your life, what would it be?",
  "Who’s someone (living or not) you’d love to meet, and why?"
];

const confidenceLines = [
  "You’re thoughtful, you’re curious — that already makes this date different.",
  "Prepared beats perfect. You’ve got this.",
  "Whatever happens tonight, you showed up ready. That counts."
];

const topicIdeasMap = {
  "Music 🎵": "Go to a record store or share playlists over drinks.",
  "Film 🎬": "Catch a movie or check out an indie cinema.",
  "Celebrity News 🌟": "Try a trendy restaurant or spot where celebrities have been.",
  "Reality TV 💅": "Play a lighthearted game like 'who would win' — reality edition.",
  "Video Games 🎮": "Go to an arcade bar or play co-op games together.",
  "Football 🏈": "Catch part of the game at a sports bar.",
  "Basketball 🏀": "Shoot some hoops at a park or talk favorite teams over drinks.",
  "Baseball ⚾": "Grab snacks and head to a local minor league game.",
  "Hockey 🏒": "Find a local game or grab wings and watch a match somewhere lively."
};

const Events = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const { userName, dateName, city, selectedTopics = [], energy = "Dreamy ✨" } = userData;
  const theme = energyThemes[energy];

  const [spark, setSpark] = useState("");
  const [confidence, setConfidence] = useState("");

  useEffect(() => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setSpark(rand(sparkQuestions));
    setConfidence(rand(confidenceLines));
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} px-6 py-8`}>
      <div className="max-w-3xl mx-auto">
        <PageHeader
          emoji="🌟"
          subtitle={`Here's a little inspiration before you talk to ${dateName} in ${city}.`}
        />

        {/* Local Events Placeholder */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-midnight">
            🎫 Local Events in {city}
          </h2>
          <p className="italic text-midnight">
            Local events coming soon! In the meantime, here are a few fun date ideas and things to talk about...
          </p>
        </div>

        {/* Tailored Date Ideas Based on Topics */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-midnight">
            💡 Based on Their Interests
          </h2>
          {selectedTopics.length > 0 ? (
            <ul className="list-disc list-inside text-midnight text-sm">
              {selectedTopics.map((topic) => (
                <li key={topic}>
                  <span className="font-semibold">{topic}:</span>{" "}
                  {topicIdeasMap[topic] || "Do something casual and personal that lets you chat and connect."}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-midnight italic">We'll match suggestions once you tell us what they're into!</p>
          )}
        </div>

        {/* Spark a Conversation */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-midnight">
            💬 Spark a Conversation
          </h2>
          <p className="italic text-midnight">{spark}</p>
        </div>

        {/* Real Talk Section */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-midnight">
            💌 Real Stories/Advice
          </h2>
          <p className="italic text-midnight mb-2">
            “I once told my date I was nervous — and they said they were too. We laughed, relaxed, and had the best night.”
          </p>
          <p className="text-sm text-midnight">
            Got a story or wisdom to share? Need some dating advice? Email us at{' '}
            <a href="mailto:talkmoretonight@gmail.com" className="underline hover:text-purple-700">
              talkmoretonight@gmail.com
            </a>
          </p>
        </div>

        {/* Confidence Boost */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-midnight">
            💖 Quick Reminder
          </h2>
          <p className="italic text-midnight">{confidence}</p>
        </div>

        {/* Bonus Ideas */}
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-midnight">
            ✨ Need More Ideas?
          </h2>
          <ul className="list-disc list-inside text-sm text-midnight">
            {fallbackIdeas.sort(() => 0.5 - Math.random()).slice(0, 2).map((idea, i) => (
              <li key={i}>{idea}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/news")}
            className="bg-white text-midnight px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
          >
            ← Back to News
          </button>
          <button
            onClick={() => navigate("/")}
            className={`${theme.button} text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform shadow-md`}
          >
            🔄 Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;