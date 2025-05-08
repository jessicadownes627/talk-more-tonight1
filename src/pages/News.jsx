
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newsKeywordMap } from "../data/newsKeywordMap";

const News = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics = [], city = "" } = location.state || {};

  const [articlesByTopic, setArticlesByTopic] = useState({});
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const results = {};

      for (const topic of topics) {
        const keywords = newsKeywordMap[topic];
        if (!keywords || keywords.length === 0) continue;

        const query = encodeURIComponent(keywords.join(" OR "));
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=5&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          const articles = (data.articles || [])
            .filter((article) => {
              const publishedDate = new Date(article.publishedAt);
              const threeDaysAgo = new Date();
              threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
              return publishedDate > threeDaysAgo;
            })
            .slice(0, 3);

          results[topic] = articles;
        } catch (err) {
          results[topic] = [];
        }
      }

      setArticlesByTopic(results);
      setLoading(false);
    };

    fetchArticles();
  }, [topics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 text-midnight p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-script text-center mb-10">Tonight's Headlines ✨</h1>

        {loading ? (
          <p className="text-center">Loading news just for you...</p>
        ) : (
          topics.map((topic) => (
            <div key={topic} className="mb-8">
              <h2 className="text-xl font-bold mb-3">{topic}</h2>
              {articlesByTopic[topic] && articlesByTopic[topic].length > 0 ? (
                articlesByTopic[topic].map((article, index) => (
                  <div key={index} className="mb-4">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-purple-600">
                      {article.title}
                    </a>
                    <p className="text-sm text-gray-600">
                      {new Date(article.publishedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="italic text-gray-700">
  Okay, not every article is a perfect match. That’s dating… and AI! 😅 But you’re still interesting — so, keep it going!
</p>

              )}
            </div>
          ))
        )}

        <div className="flex justify-between mt-12">
          <button
            onClick={() => navigate("/tonightstalktips", { state: { topics, city } })}
            className="bg-white text-midnight font-medium px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            ← Back to Tips
          </button>
          <button
            onClick={() => navigate("/events", { state: { topics, city } })}
            className="bg-white text-midnight font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            On Tonight in {city} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;

