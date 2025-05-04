import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const TonightsTalkTips = () => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Access user context
  
  // Sample conversation tips
  const tips = {
    Movies: {
      context: "Talking about your favorite movie can be a great icebreaker.",
      tip: "Ask them what movies they’ve seen recently. Share a funny movie quote!",
      starter: "What’s the last movie you watched? Was it any good?"
    },
    Music: {
      context: "Music is a fun topic, especially if you share a favorite genre.",
      tip: "Ask them about their favorite artists, and maybe you can even share a playlist!",
      starter: "Who’s your favorite artist right now? I’m loving [Artist Name]."
    },
    // Add more tips as needed
  };

  const [selectedTopics, setSelectedTopics] = useState([
    "Movies",
    "Music",  // Assume these are selected in the Topics page
  ]);

  useEffect(() => {
    // If no topics are selected, go back to Topics page
    if (selectedTopics.length === 0) {
      navigate("/topics");
    }
  }, [selectedTopics, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-midnight px-4 py-8 font-poppins">
      <div className="max-w-xl mx-auto bg-white bg-opacity-80 p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#003366" }}>
          Tips for Tonight's Conversation
        </h1>

        <div>
          {selectedTopics.map((topic) => (
            <div key={topic} className="mb-8">
              <h2 className="text-xl font-bold" style={{ color: "#003366" }}>
                {topic}
              </h2>
              <p className="mb-2">{tips[topic].context}</p>
              <p className="mb-2">{tips[topic].tip}</p>
              <p className="italic">{tips[topic].starter}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/news")}
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TonightsTalkTips;
