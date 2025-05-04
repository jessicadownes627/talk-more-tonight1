import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Access context

const Welcome = () => {
  const { setUser } = useUserContext();  // Function to set user data
  const navigate = useNavigate();  // Function to navigate to other pages

  const [name, setName] = useState("");
  const [dateName, setDateName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set user data into context
    setUser({ name, dateName, city });
    // Navigate to topics page
    navigate("/topics");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-midnight px-4 py-8 font-poppins">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-center" style={{ fontFamily: 'Bad Script, cursive', color: "#003366" }}>
          💫 Talk More Tonight 💫
        </h1>
        <h2 className="text-xl font-medium text-center mb-8" style={{ color: "#003366" }}>
          A fun, fast way to feel prepared for your date tonight ✨
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" style={{ color: "#003366" }}>
              Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Homer"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" style={{ color: "#003366" }}>
              Date's Name:
            </label>
            <input
              type="text"
              value={dateName}
              onChange={(e) => setDateName(e.target.value)}
              placeholder="e.g., Marge"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2" style={{ color: "#003366" }}>
              City:
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., New York"
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

export default Welcome;
