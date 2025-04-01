## UserState in react : my mood journal 

Output:

![Alt Text](https://github.com/Reshmagvs/moodjournal_userstate/blob/main/modd1.png)
![Alt Text](https://github.com/Reshmagvs/moodjournal_userstate/blob/main/modd2.png)


1. Create a React app using these commands in VS Code terminal :

```
npx create-react-app mood-journal
cd mood-journal
code .
```
2. To create mood journal app
Replace the code to the below one , inside App.js which will be in src folder :

```
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
```
3. Add Some Styling :
Create App.css in the src folder and add the below code 

```
/* Global Styles */
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  transition: background 0.5s, color 0.5s;
}

/* Light & Dark Mode */
.light-mode {
  background-color: #fceaff;
  color: #333;
}

.dark-mode {
  background-color: #1b1b2f;
  color: #fff;
}

/* App Container */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
}

/* Title */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Subtitle */
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Mood Buttons */
.mood-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.mood-btn {
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.mood-btn:hover {
  transform: scale(1.1);
}

/* Quote Box */
.quote-box {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* Emoji Rain */
.emoji-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.emoji {
  position: absolute;
  font-size: 2rem;
  animation: fall 3s linear infinite;
}

@keyframes fall {
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(100vh);
  }
}

/* Dark Mode Toggle */
.toggle-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.switch {
  position: relative;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4cd137;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Footer */
footer {
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.7;
}

```
4. Install react-confetti by running the below command in the terminal : 

```
npm install react-confetti
```
5. Run your app :
```
npm start
```
