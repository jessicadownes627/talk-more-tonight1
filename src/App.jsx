import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Topics from "./pages/Topics";
import TonightsTalkTips from "./pages/TonightsTalkTips";
import News from "./pages/News";
import Events from "./pages/Events";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/tonightstalktips" element={<TonightsTalkTips />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </UserProvider>
  );
}

export default App;  // 👈 Make sure this is here
