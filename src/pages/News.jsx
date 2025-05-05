import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const News = () => {
  const location = useLocation();
  const { selectedTopics = [], customInput = "" } = location.state || {};
  const [newsByTopic, setNewsByTopic] = useState({});
  const [error, setError] = useState(null);

  const apiKey = "f15123069c794e60817dfcef2998ea0a";

  useEffect(() => {
    const fetchNews = async () => {
      let allTopics = [...selectedTopics];
      if (customInput.trim()) allTopics.push(customInput.trim());

      let results = {};
      for (const topic of allTopics) {
        try {
          const res = await axios.get(
            `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(topic)}&language=en&pageSize=3&apiKey=${apiKey}`
          );
          results[topic] = res.data.articles.filter(
            (article) =>
              article.title.length > 20 &&
              !article.title.toLowerCase().includes("betting") &&
              article.source?.name
          );
        } catch (err) {
          if (err.response?.status === 429) {
            setError("Too many requests! Please wait a moment and try again.");
            break;
          } else {
            console.error(`Error fetching news for ${topic}:`, err);
            setError("Something went wrong while loading news.");
          }
        }
        await delay(1100); // Wait 1.1s before the next request
      }
      setNewsByTopic(results);
    };

    fetchNews();
  }, [selectedTopics, customInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-200 p-6 text-midnight font-sans">
      <h1 className="text-3xl font-bold mb-4">Hot Headlines for Tonight 💫</h1>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!error &&
        Object.entries(newsByTopic).map(([topic, articles]) => (
          <div key={topic} className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-midnight">
              {topic}
            </h2>
            {articles.length > 0 ? (
              <ul className="list-disc ml-6">
                {articles.map((article, i) => (
                  <li key={i}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      {article.title}
                    </a>
                    <span className="text-sm text-gray-600 block">
                      {article.source.name} –{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No major news found for this topic.</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default News;
