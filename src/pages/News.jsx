// src/pages/News.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

const News = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      // Constructing query string based on user's selected topics
      const topicQuery = user.selectedTopics.join(" OR "); // Assuming selectedTopics is in user context
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${topicQuery}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNewsArticles(response.data.articles);
      setLoading(false);
    } catch (err) {
      setError("Failed to load news articles.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.selectedTopics.length > 0) {
      fetchNews();
    }
  }, [user.selectedTopics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-midnight px-4 py-8 font-poppins">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-80 p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#003366" }}>
          📰 Latest News for Your Date Chat
        </h1>

        {loading ? (
          <p>Loading news...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul className="space-y-4">
            {newsArticles.map((article, index) => (
              <li key={index} className="border-b pb-4">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-700 hover:underline">
                  {article.title}
                </a>
                <p className="text-sm text-gray-700 mt-1">{article.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {article.source.name} · {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/tonightstalktips")}
            className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-2xl"
          >
            ⬅️ Back
          </button>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-2xl"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
