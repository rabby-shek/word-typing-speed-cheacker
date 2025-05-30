# Typing Speed Test

A simple typing speed test app built using **HTML, CSS, and JavaScript**.

## 🚀 Features

- Random paragraph loading
- Real-time typing evaluation
- Tracks:
  - **Mistakes**
  - **CPM (Characters Per Minute)**
  - **WPM (Words Per Minute)**
- Timer countdown
- Reset button to try again

## 🛠️ How It Works

- A random paragraph is shown.
- Start typing.
- Timer starts automatically on your first keystroke.
- Mistakes are highlighted.
- CPM and WPM are calculated live.
- Click "Try Again" to reset the game with a new paragraph.

## 📁 Files

- `index.html` – Main structure
- `style.css` – Styling
- `script.js` – Functionality (input handling, timer, accuracy, WPM/CPM calculation)

## 🧠 WPM Formula

```js
let wpm = timeSpent > 0 ? Math.round(((charIndex - mistakes) / 5 / timeSpent) * 60) : 0;
