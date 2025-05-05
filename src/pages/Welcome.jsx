import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Welcome() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    yourName: user.yourName || "",
    dateName: user.dateName || "",
    location: user.location || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    navigate("/topics");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-400 flex items-center justify-center p-8 font-poppins text-midnight">
      <div className="bg-white bg-opacity-80 p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-6 font-bad-script text-midnight">
          Welcome to Your Dating Concierge 💘
        </h1>
        <p className="text-lg mb-6">
          Let’s get to know you and your date so we can help you shine tonight ✨
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-semibold mb-1">Your Name</label>
            <input
              type="text"
              name="yourName"
              value={form.yourName}
              onChange={handleChange}
              placeholder="e.g. Jordan"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Your Date’s Name</label>
            <input
              type="text"
              name="dateName"
              value={form.dateName}
              onChange={handleChange}
              placeholder="e.g. Taylor"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Miami, FL"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-midnight text-white py-2 rounded-2xl hover:bg-blue-800 transition"
          >
            Let’s Go! 💫
          </button>
        </form>
      </div>
    </div>
  );
}
