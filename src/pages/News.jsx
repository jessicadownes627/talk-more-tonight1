import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Define topic-to-category mappings
const categoryMap = {
  politics: "Smart & Curious 🧠",
  tech: "Smart & Curious 🧠",
  travel: "Smart & Curious 🧠",
  food: "Smart & Curious 🧠",
  dating: "Smart & Curious 🧠",
  business: "Smart & Curious 🧠",

  film: "Pop Culture 🍿",
  streaming: "Pop Culture 🍿",
  reality: "Pop Culture 🍿",
  celebrity: "Pop Culture 🍿",
  music: "Pop Culture 🍿",
  fashion: "Pop Culture 🍿",
  shopping: "Pop Culture 🍿",
  "reality tv": "Pop Culture 🍿",
  "celebrity drama": "Pop Culture 🍿",

  nfl: "Sports Talk 🏆",
  nba: "Sports Talk 🏆",
  mlb: "Sports Talk 🏆",
  nhl: "Sports Talk 🏆",
  golf: "Sports Talk 🏆",
  "college sports": "Sports Talk 🏆",

  "award shows": "What’s Hot 🔥",
  races: "What’s Hot 🔥",
  festivals: "What’s Hot 🔥",
  finales: "What’s Hot 🔥",
  trending: "What’s Hot 🔥",
  "national days": "What’s Hot 🔥",
  astrology: "What’s Hot 🔥",
};

const News = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], userName = "" } = location.state || {};

  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const getDateNDaysAgo = (n) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split("T")[0];
  };

  const dedupeArticles = (articles) => {
    const seen = new Set();
    return articles.filter((article) => {
      const key = article.title + article.url;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      setError("");
      const grouped = {};

      for (const topic of topics) {
        const cacheKey = `news_${topic}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheAgeLimit = 15 * 60 * 1000; // 15 min

        let articles = [];

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < cacheAgeLimit) {
            articles = data;
          }
        }

        if (!articles.length) {
          try {
            const fromDate = getDateNDaysAgo(3);
            const res = await axios.get(
              `https://newsapi.org/v2/everything?q=${encodeURIComponent(
                topic
              )}&language=en&from=${fromDate}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
            );
            articles = (res.data.articles || []).filter((a) => a.title && a.url);

            localStorage.setItem(
              cacheKey,
              JSON.stringify({ data: articles, timestamp: Date.now() })
            );
          } catch (err) {
            console.error(err);
            setError("Trouble fetching dreamy headlines.");
          }
        }

        const category = categoryMap[topic.toLowerCase()] || "Wildcard 🎲";
        const currentArticles = grouped[category] || [];

        const combined = dedupeArticles([...currentArticles, ...articles]);
        grouped[category] = combined.slice(0, 3); // limit to 3
      }

      setArticlesByCategory(grouped);
      setLoading(false);
    };

    if (topics.length > 0) {
      fetchAllNews();
    }
  }, [topics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-midnight p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-script text-center mb-6 drop-shadow-glow">
          Stay sharp, look cute — here’s what’s going on 😉
        </h1>

        {loading ? (
          <p className="text-center text-lg">Fetching dreamy headlines...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : Object.keys(articlesByCategory).length === 0 ? (
          <p className="text-center text-lg">
            No fresh news — try switching up your topics?
          </p>
        ) : (
          Object.entries(articlesByCategory).map(([category, articles]) => (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-bold mb-3">{category}</h2>
              <ul className="grid gap-4">
                {articles.map((article, index) => (
                  <li
                    key={index}
                    className="bg-white bg-opacity-80 p-4 rounded-lg shadow hover:scale-[1.02] transition-transform"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold hover:underline block"
                    >
                      {article.title}
                    </a>
                    {article.description && (
                      <p className="text-sm mt-1">{article.description}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(article.publishedAt).toLocaleDateString(undefined, {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      })}
                    </p>
                    {article.source?.name && (
                      <p className="text-sm italic text-gray-500">
                        Source: {article.source.name}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        <div className="mt-10 flex justify-start">
          <button
            onClick={() => navigate("/tonightstalktips", { state: { topics, userName } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
