import React from "react";
import { useUser } from "../context/UserContext";

const PageHeader = ({ subtitle = "", emoji = "💫" }) => {
  const { userData } = useUser();
  const { name = "You", energy = "Dreamy ✨" } = userData;

  const titleColor =
  energy === "Bold 🔥"
    ? "text-red-700"
    : energy === "Chill 🌙"
    ? "text-blue-900"
    : "text-midnight";

const subtitleColor =
  energy === "Bold 🔥"
    ? "text-red-800/90"
    : energy === "Chill 🌙"
    ? "text-blue-800/90"
    : "text-midnight/80";


  return (
<div className="text-center mb-6">
  <h1 className={`text-3xl font-script font-bold mb-2 ${titleColor}`}>
    Let’s Talk More Tonight, {name} {emoji}
  </h1>
  {subtitle && (
    <p className={`italic text-sm max-w-xl mx-auto ${subtitleColor}`}>
      {subtitle}
    </p>
  )}
</div>

  );
};

export default PageHeader;
