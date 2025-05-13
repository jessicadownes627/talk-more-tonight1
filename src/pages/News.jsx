import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { newsKeywordMap } from "../data/newsKeywordMap"; // if needed later

const mockHeadlines = {
  "Politics 🗳️": [
    {
      title: "Congress Debates 2025 Tax Plan",
      url: "https://example.com/politics1",
      publishedAt: "2025-05-08T10:00:00Z"
    },
    {
      title: "Trump Comments on Primary Field",
      url: "https://example.com/politics2",
      publishedAt: "2025-05-07T12:00:00Z"
    }
  ],
  "Football 🏈": [
    {
      title: "Rookie QB Shines in First Practice",
      url: "https://example.com/football1",
      publishedAt: "2025-05-08T14:00:00Z"
    }
  ],
  "Wildcard ❔": [
    {
      title: "5 Surprising Facts About First Dates",
      url: "https://example.com/wildcard1",
      publishedAt: "2025-05-07T16:00:00Z"
    },
    {
      title: "Why People Are Talking About AI Over Dinner",
      url: "https://example.com/wildcard2",
      publishedAt: "2025-05-06T09:00:00Z"
    }
  ]
};

const News = () => {
  const { userData } = useUser();
  const { selectedTopics = [] } = userData;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 text-midnight px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-50 p-6 rounded-2xl shadow-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🗞️ Mock Headlines to Talk About
        </h1>

        {selectedTopics.map((topic) => (
          <div key={topic} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{topic}</h2>
            <ul className="space-y-2">
              {(mockHeadlines[topic] || mockHeadlines["Wildcard ❔"]).map((article, i) => (
                <li key={i}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-600">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/events")}
            className="bg-pink-500 text-white text-lg py-2 px-6 rounded-full hover:bg-pink-600 transition"
          >
            💫 See What’s Happening Near You
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;

