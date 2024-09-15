import React, { useState } from 'react';
import TrialLayout from './components/TrialLayout';
import '../src/styles/App.css';

const trials = [
  {
    // First trial with the same incremental instructions
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
  },
  {
    // Second trial with the same instruction but different images
    instructionSteps: [
      "Click on the picture of the",
      "Click on the picture of the warm",
      "Click on the picture of the warm water",
      "Click on the picture of the warm water with the purple spoon."
    ],
    images: [
      { id: 1, label: "Distractor-1", imgSrc: "/trial-2/distractor-1.png" },
      { id: 2, label: "Target", imgSrc: "/trial-2/target.png" },
      { id: 3, label: "Distractor-2", imgSrc: "/trial-2/distractor-2.png" },
      { id: 4, label: "Competitor", imgSrc: "/trial-2/competitor.png" }
    ]
  }
];

function App() {
  const [showWelcomePage, setShowWelcomePage] = useState(true); // Default is to show the welcome page
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0); // Added state for current trial index

  const handleStartClick = () => {
    setShowWelcomePage(false); // Hide the welcome page and show the first trial
  };

  return (
      <div className="App">
        {showWelcomePage ? (
            <WelcomePage onStartClick={handleStartClick} />
        ) : (
            <TrialLayout
                trials={trials}
                currentTrialIndex={currentTrialIndex}
                setCurrentTrialIndex={setCurrentTrialIndex} // Passing setCurrentTrialIndex to TrialLayout
                totalTrials={trials.length}
            />
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
