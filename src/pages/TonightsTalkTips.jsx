// src/pages/TonightsTalkTips.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const topicTips = {
  "Baseball (MLB)": {
    context: "💡 The MLB season is in full swing with thrilling games and standout players.",
    say: "📢 I’ve been catching highlights—some of those home runs are insane!",
    ask: "❓ Do you prefer watching live at the ballpark or from your couch?"
  },
  "Basketball (NBA)": {
    context: "💡 NBA playoffs are heating up with buzzer-beaters and MVP debates.",
    say: "📢 That last-minute three-pointer had me on the edge of my seat!",
    ask: "❓ Who’s your pick to win it all this year?"
  },
  "Football (NFL)": {
    context: "💡 The NFL Draft just wrapped up—everyone’s buzzing about surprise picks and trades.",
    say: "📢 Did you catch the draft? Some of those selections were wild!",
    ask: "❓ Which team do you think nailed the draft?"
  },
  "Hockey (NHL)": {
    context: "💡 NHL playoffs are in full swing and the tension on the ice is electric.",
    say: "📢 I love the intensity of playoff hockey—nonstop action!",
    ask: "❓ Do you root for a specific team or just love the sport?"
  },
  "Politics (Trump, 2025, debates)": {
    context: "💡 Political headlines are everywhere with early 2025 election buzz.",
    say: "📢 Politics always sneaks into conversations—got any hot takes?",
    ask: "❓ How do you feel about the biggest stories right now?"
  },
  "Travel & Vacations": {
    context: "💡 Summer travel season is coming—everyone’s planning getaways.",
    say: "📢 I can’t wait for my next beach trip—sun and sand, please!",
    ask: "❓ If you could teleport anywhere tonight, where would you go?"
  },
  "Music (Taylor Swift, BTS, etc.)": {
    context: "💡 New albums and world tours have fans buzzing!",
    say: "📢 I’ve had that new track on repeat—so catchy!",
    ask: "❓ What’s the best concert you’ve ever been to?"
  },
  "Movies & TV Shows": {
    context: "💡 Blockbusters and binge-worthy series are trending now.",
    say: "📢 I just finished that hit show—couldn’t stop watching!",
    ask: "❓ Any recommendations for my next binge?"
  },
  "Food & Drinks": {
    context: "💡 Viral recipes and pop-up restaurants are all the rage.",
    say: "📢 I tried that trending sushi roll—mind-blowing!",
    ask: "❓ What’s your favorite foodie find lately?"
  },
  "Tech & Gadgets": {
    context: "💡 AI tools and new gadgets keep popping up every day.",
    say: "📢 Tech moves so fast—I barely keep up!",
    ask: "❓ What’s the coolest gadget you own?"
  },
  "Fashion & Style": {
    context: "💡 Fashion week just happened—street style is on point.",
    say: "📢 Those runway looks were next-level creative!",
    ask: "❓ Any trends you’re loving or avoiding?"
  },
  "Fitness & Health": {
    context: "💡 Wellness trends and workout challenges are everywhere.",
    say: "📢 I tried that new HIIT class—talk about a workout!",
    ask: "❓ What’s your go-to fitness routine?"
  },
  "Books & Literature": {
    context: "💡 Bestsellers and book clubs are back in style.",
    say: "📢 I couldn’t put down my latest read—it was amazing!",
    ask: "❓ What book has had the biggest impact on you?"
  },
  "Dating & Relationships": {
    context: "💡 Dating apps and love advice are always trending topics.",
    say: "📢 Relationships are a journey—what’s been your highlight?",
    ask: "❓ What makes a perfect date night for you?"
  },
  "Social Media Trends": {
    context: "💡 Memes, challenges, and viral videos keep us all scrolling.",
    say: "📢 Did you see that new TikTok trend? So addictive!",
    ask: "❓ What social media trend do you think will blow up next?"
  },
  "Weekend Plans": {
    context: "💡 Everyone’s planning epic weekends—brunch, concerts, or chill hangs.",
    say: "📢 I’m thinking rooftop vibes or a cozy movie marathon.",
    ask: "❓ What’s your ideal weekend?"
  },
  "Current Events": {
    context: "💡 News cycles move fast—there’s always something new.",
    say: "📢 I saw this crazy headline today—so wild!",
    ask: "❓ Did you hear about the [headline]? What do you think?"
  },
  "Art & Culture": {
    context: "💡 Gallery openings and festivals are popping up everywhere.",
    say: "📢 I visited that new exhibit—so thought-provoking.",
    ask: "❓ If you could create any art piece, what would it be?"
  },
  "Animals & Pets": {
    context: "💡 Pet videos and animal rescues warm everyone’s heart.",
    say: "📢 I could watch puppy clips all day!",
    ask: "❓ Are you a dog person, cat person, or have a rare pet?"
  },
  "Environmental Issues": {
    context: "💡 Climate action is top of mind with new sustainability efforts.",
    say: "📢 I’m trying to reduce my carbon footprint—how about you?",
    ask: "❓ What eco-friendly habit do you swear by?"
  },
  "Hobbies & Interests": {
    context: "💡 Hobbies give us something to geek out on, from gaming to gardening.",
    say: "📢 I’ve been obsessed with [hobby] lately—it’s addictive.",
    ask: "❓ What hobby could you talk about for hours?"
  }
};

const TonightsTalkTips = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const selectedTopics = state?.selectedTopics || [];
  const customTopic = state?.customTopic || '';
  const allTopics = [...selectedTopics];
  if (customTopic) allTopics.push(customTopic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-400 text-midnight px-6 py-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Bad Script, cursive' }}>
          💫 Talk Tips for {user.dateName || 'Your Date'} 💫
        </h1>
        <p className="text-center mb-8 text-lg">
          Ready to keep the conversation flowing? Here’s how to make each topic pop! 😍
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allTopics.map((topic, idx) => {
            const tip = topicTips[topic] || {
              context: '💡 This topic is fresh—bring it up and see where it goes!',
              say: '📢 I’ve been curious about that lately.',
              ask: '❓ What’s your take on that?'
            };
            return (
              <div key={idx} className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">
                <h2 className="text-2xl font-semibold mb-3">✨ {topic}</h2>
                <p className="mb-2"><span>💡</span> <strong>Why:</strong> {tip.context}</p>
                <p className="mb-2"><span>📢</span> <strong>Say:</strong> {tip.say}</p>
                <p><span>❓</span> <strong>Ask:</strong> {tip.ask}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate('/topics')}
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-2xl"
          >
            ⬅️ Back
          </button>
          <button
            onClick={() => navigate('/news', { state: { selectedTopics, customTopic } })}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-2xl"
          >
            Next: News 🔥
          </button>
        </div>
      </div>
    </div>
  );
};

export default TonightsTalkTips;
