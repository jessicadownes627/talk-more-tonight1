// src/pages/News.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const News = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], city = "" } = location.state || {};

  const [articlesByTopic, setArticlesByTopic] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const baseUrl = "https://newsapi.org/v2/everything";
      const fromDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const fetchedData = {};

      for (const topic of topics) {
        const query = encodeURIComponent(topic.split(" ")[0]);
        const url = `${baseUrl}?q=${query}&from=${fromDate}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            fetchedData[topic] = data.articles.slice(0, 3);
          } else {
            fetchedData[topic] = [];
          }
        } catch (err) {
          fetchedData[topic] = [];
        }
      }

      setArticlesByTopic(fetchedData);
    };

    fetchArticles();
  }, [topics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-midnight p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-8">
          Fresh Finds for Tonight's Talk 🗞️
        </h1>

        {topics.map((topic, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{topic}</h2>
            {articlesByTopic[topic] && articlesByTopic[topic].length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {articlesByTopic[topic].map((article, i) => (
                  <li key={i}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline hover:text-purple-600"
                    >
                      {article.title}
                    </a>{" "}
                    <span className="text-sm text-gray-600">
                      ({new Date(article.publishedAt).toLocaleDateString("en-US")})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-sm text-gray-600">
                No fresh headlines right now... but this topic is still totally talk-worthy. 😉
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/tonightstalktips", { state: { topics, city } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to Tips
          </button>
          <button
            onClick={() => navigate("/events", { state: { city } })}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Next: Local Events →
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
