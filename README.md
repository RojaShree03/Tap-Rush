# ⚡ Tap Rush

## Reaction & Speed Challenge Game

Tap Rush is a modern React-based reaction game designed to test **speed, accuracy, focus, and consistency**.

The project started from the basic concept of a **Counter Application using React `useState`** and was extended into an interactive game with multiple game modes, timers, score tracking, lives, combo systems, best scores, animations, and persistent game history.

---

## 🚀 Live Demo

**Vercel:**  
https://tap-rush-zeta.vercel.app/

**GitHub Repository:**  
https://github.com/RojaShree03/Tap-Rush.git

---

## 🎮 Game Modes

### 🟢 Easy

A simple speed-tapping challenge.

- Tap the button as many times as possible.
- Every successful tap increases the score.
- Focus on speed and consistency.
- Duration: **10 seconds**

### 🔵 Normal

A reaction-based challenge.

- The target moves after every successful tap.
- Quickly locate and tap the moving target.
- Focus on reaction speed and accuracy.
- Duration: **15 seconds**

### 🔴 Pro

A precision-based challenge.

- Moving target
- 3 lives
- Combo tracking
- Miss detection
- Perfect tap feedback
- Higher difficulty
- Duration: **20 seconds**

### 🟣 Zero Rush

A countdown-style challenge.

- Starts from **50**
- Every tap decreases the number by 1.
- Reach `0` as quickly as possible.
- The fastest completion time becomes the best score.
- Time limit: **30 seconds**

---

## ✨ Features

- ⚡ Fast reaction-based gameplay
- 🎯 Moving targets
- ❤️ Life system
- 🔥 Combo tracking
- ✨ Perfect tap feedback
- ⏱️ Countdown timer
- 🏆 Personal best scores
- 📊 Game statistics
- 📜 Recent game history
- 💾 LocalStorage persistence
- 📱 Responsive design
- 🎨 Apple-inspired minimal UI
- 🖥️ Desktop and mobile support
- 🎬 Smooth animations and micro-interactions
- 🔄 Replay functionality
- 🎮 Multiple game modes

---

## ⚛️ React Concepts Used

This project demonstrates several important React concepts.

### useState

React's `useState` hook is used to manage dynamic application state such as:

- Score
- Timer
- Combo
- Lives
- Remaining number
- Game mode
- Game result
- Best scores

Example:

```jsx
const [score, setScore] = useState(0);