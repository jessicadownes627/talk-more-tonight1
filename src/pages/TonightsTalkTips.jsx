import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const topicTips = {
  "Baseball (MLB)": {
    context: "⚾ The MLB season is heating up — Shohei Ohtani is making waves with the Dodgers.",
    say: "It’s wild how much Ohtani is dominating this season, both pitching and hitting.",
    ask: "Do you follow any team, or just watch when it gets exciting?"
  },
  "Basketball (NBA)": {
    context: "🏀 The NBA Playoffs are here — buzzer beaters, upsets, and title dreams.",
    say: "Playoff energy is so intense! Some of these games have been wild.",
    ask: "Who's your pick to take the championship this year?"
  },
  "Football (NFL)": {
    context: "🏈 NFL Draft just wrapped — new stars are already shaking up predictions.",
    say: "I love seeing fresh talent come in. The drama of the draft never disappoints.",
    ask: "Do you get into draft season or just wait for the games?"
  },
  "Hockey (NHL)": {
    context: "🏒 Stanley Cup Playoffs are full of surprises — underdogs are making moves.",
    say: "Hockey playoffs hit different — the speed, the tension… it’s addicting.",
    ask: "Are you into the NHL or more of a casual playoff watcher?"
  },
  "Politics": {
    context: "🗳️ A few big-name court cases and international summits are dominating headlines.",
    say: "It’s hard to keep up with all the legal drama and global diplomacy lately.",
    ask: "Do you like staying up to date on politics or is it too much sometimes?"
  },
  "Pop Culture": {
    context: "🎤 The Met Gala just turned heads — fashion and celebrity chaos everywhere.",
    say: "The Met Gala theme was wild this year. Some of those outfits were unforgettable.",
    ask: "If you got invited, would you go bold or play it cool?"
  },
  "TV + Streaming": {
    context: "📺 New shows on Netflix and Hulu are dropping weekly — total binge-fest season.",
    say: "I just added a few new series to my list — it’s overwhelming in the best way.",
    ask: "What's your go-to show to rewatch or binge?"
  },
  "Music": {
    context: "🎶 Drake and Taylor Swift are both touring — ticket FOMO is real right now.",
    say: "It feels like every artist is on tour this year — it’s a live music explosion.",
    ask: "What’s your dream concert or festival lineup?"
  },
  "Tech + AI": {
    context: "🤖 AI is everywhere — new tools and updates are dropping weekly.",
    say: "It’s kind of fun (and creepy) seeing how fast AI is growing.",
    ask: "Do you think you'd ever let AI plan your date night?"
  },
  "Food + Drink": {
    context: "🍣 Caviar and tinned fish are trending again — fancy snacks, big vibes.",
    say: "I'm intrigued by all the upscale snack trends — TikTok is obsessed.",
    ask: "What's your ideal date-night snack or drink situation?"
  },
  "Fashion": {
    context: "👗 Micro-mini skirts and sheer layers are everywhere this season.",
    say: "I’ve seen some bold looks out lately — spring fashion is fun again.",
    ask: "Do you keep up with trends or have your own signature style?"
  },
  "Fitness + Sports": {
    context: "💪 Hot girl walks are back — with ankle weights and playlists, of course.",
    say: "Fitness trends are wild right now — it’s fun trying new stuff.",
    ask: "What’s your favorite way to stay active?"
  },
  "Dating + Relationships": {
    context: "❤️ There’s new research about green flags — not just red flags!",
    say: "I saw a post about green flags and honestly, it changed how I date.",
    ask: "What's one thing someone can do that makes you instantly interested?"
  },
  "Travel": {
    context: "✈️ Italy and Japan are topping spring travel lists — passport-ready?",
    say: "Wanderlust is hitting hard — it feels like everyone’s on the move.",
    ask: "If we could teleport anywhere right now, where would we go?"
  },
  "Books + Lit": {
    context: "📚 Colleen Hoover and dark academia thrillers are everywhere again.",
    say: "My reading list keeps growing — TikTok is dangerous for book recs.",
    ask: "What’s a book you finished and couldn’t stop thinking about?"
  },
  "Gaming": {
    context: "🎮 Cozy games like Stardew and Animal Crossing are trending (again).",
    say: "I get why people love relaxing games — pure serotonin.",
    ask: "Are you more into chill games or competitive ones?"
  },
  "Memes + Trends": {
    context: "😂 The 'is it cake?' meme is back — TikTok is unpredictable.",
    say: "Memes are so unhinged lately and I live for it.",
    ask: "What's the last meme that made you genuinely laugh?"
  },
};

export default function TonightsTalkTips() {
  const navigate = useNavigate();
  const { user, selectedTopics, customTopic } = useUserContext();

  const all = [...selectedTopics];
  if (customTopic) all.push(customTopic);

  if (!all.length) {
    return (
      <div className="p-8 text-center">
        <p>No topics selected—go back and pick some!</p>
        <button onClick={() => navigate("/topics")}>Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-400 p-8 font-poppins text-midnight">
      <h1 className="text-4xl font-bold mb-4 text-center">
        💫 Talk Tips for {user.dateName || "Your Date"} 💫
      </h1>
      <p className="text-center mb-8">Smooth talk, dreamy vibes — you got this! 😍</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {all.map((topic) => {
          const tip = topicTips[topic] || {
            context: "💡 Just bring it up casually!",
            say: "📢 I’ve been curious about that—tell me more!",
            ask: "❓ What’s your take on it?"
          };
          return (
            <div key={topic} className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl mb-2">✨ {topic}</h2>
              <p><strong>💡 Why it matters:</strong> {tip.context}</p>
              <p><strong>📢 You could say:</strong> {tip.say}</p>
              <p><strong>❓ You could ask:</strong> {tip.ask}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-10">
        <button
          onClick={() => navigate("/topics")}
          className="bg-pink-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-pink-600"
        >
          ⬅️ Back
        </button>
        <button
          onClick={() => navigate("/news")}
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-600"
        >
          Next: News 🔥
        </button>
      </div>
    </div>
  );
}
