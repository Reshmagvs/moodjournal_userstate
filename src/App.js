import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

const moods = [
  { name: "Happy", emoji: "😊", color: "#74b9ff" },
  { name: "Sad", emoji: "😢", color: "#636e72" },
  { name: "Excited", emoji: "🎉", color: "#ff7675" },
  { name: "Stressed", emoji: "😰", color: "#a29bfe" },
  { name: "Tired", emoji: "😴", color: "#b2bec3" },
];

const quotes = {
  Happy: ["Keep smiling! 😊", "Happiness looks great on you! 😍", "Find joy in the little things! 🌸"],
  Sad: ["It's okay to feel sad. ❤️", "This too shall pass. 💪", "Sending you a virtual hug! 🤗"],
  Excited: ["Your energy is inspiring! 🚀", "Excitement fuels greatness! 🔥", "Something amazing is coming! ✨"],
  Stressed: ["Take a deep breath. 🌿", "You are in control. 💜", "Even storms pass—this moment is temporary. ☁️"],
  Tired: ["Rest up! 😴", "Sleep is the best meditation. 🛏️", "You can’t pour from an empty cup. ☕"],
};

function getRandomQuote(mood) {
  return quotes[mood][Math.floor(Math.random() * quotes[mood].length)];
}

function App() {
  const [mood, setMood] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState("");

  useEffect(() => {
    if (mood) {
      setSelectedQuote(getRandomQuote(mood));
      setShowEmojiRain(true);
      if (mood === "Excited") setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        setShowEmojiRain(false);
      }, 3000);
    }
  }, [mood]);

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {showEmojiRain && (
        <div className="emoji-rain">
          {Array.from({ length: 30 }).map((_, index) => (
            <span key={index} className="emoji">
              {moods.find((m) => m.name === mood).emoji}
            </span>
          ))}
        </div>
      )}

      <h1 className="title"> Mood Journal </h1>
      <p className="subtitle">How are you feeling today?</p>

      <div className="mood-buttons">
        {moods.map((m) => (
          <button key={m.name} className="mood-btn" onClick={() => setMood(m.name)}>
            {m.emoji} {m.name}
          </button>
        ))}
      </div>

      {mood && (
        <div className="quote-box">
          <h2>{mood} {moods.find((m) => m.name === mood).emoji}</h2>
          <p>{selectedQuote}</p>
        </div>
      )}

      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className="slider round"></span>
        </label>
      </div>

      <footer>🌸 Made by Reshma G.V.S. 🌸</footer>
    </div>
  );
}

export default App;
