import React, { useState } from 'react';
import TrialLayout from './components/TrialLayout';
import '../src/styles/App.css';

const trials = [
  {
    instructionSteps: [
      "Click on the picture of the",
      "Click on the picture of the warm",
      "Click on the picture of the warm water",
      "Click on the picture of the warm water with the purple spoon."
    ],
    images: [
      { id: 1, label: "Competitor", imgSrc: "/trial-1/competitor.png" },
      { id: 2, label: "Target", imgSrc: "/trial-1/target.png" },
      { id: 3, label: "Contrast", imgSrc: "/trial-1/contrast.png" },
      { id: 4, label: "Distractor", imgSrc: "/trial-1/distractor.png" }
    ]
  }
  // Add more trials if needed
];

function App() {
  const [showWelcomePage, setShowWelcomePage] = useState(true); // Default is to show the welcome page

  const handleStartClick = () => {
    setShowWelcomePage(false); // Hide the welcome page and show the first trial
  };

  return (
      <div className="App">
        {showWelcomePage ? (
            <WelcomePage onStartClick={handleStartClick} />
        ) : (
            <TrialLayout trials={trials} currentTrialIndex={0} totalTrials={trials.length} />
        )}
      </div>
  );
}

function WelcomePage({ onStartClick }) {
  return (
      <div className="welcome-page">
        <h1>Welcome to the Trial Task</h1>
        <p>In this task, you will be asked to click on images based on instructions given incrementally.</p>
        <button onClick={onStartClick}>Start</button>
      </div>
  );
}

export default App;
