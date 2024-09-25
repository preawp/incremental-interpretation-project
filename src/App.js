import React, { useState } from 'react';
import InfoForm from './components/InfoForm';
import TrialPage from './components/TrialPage'; // Import your TrialPage component
import './styles/App.css'; // Assuming you have global styles

function App() {
  const [stage, setStage] = useState('welcome'); // Track the current stage ('welcome', 'form', 'trial')
  const [userData, setUserData] = useState({});  // Track the form data (user data)

  const handleStartClick = () => {
    setStage('form'); // Move from welcome page to the form
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData); // Save the form data
    setStage('trial'); // Move from the form to the trial
  };

  return (
      <div className="App">
        {stage === 'welcome' && <WelcomePage onStartClick={handleStartClick} />}
        {stage === 'form' && <InfoForm onSubmit={handleFormSubmit} />}
        {stage === 'trial' && <TrialPage userData={userData} />} {/* Pass userData to TrialPage */}
      </div>
  );
}

function WelcomePage({ onStartClick }) {
  return (
      <div className="welcome-page">
        <h1>Welcome to the Study</h1>
        <p>Thank you for participating! In this study, you will be asked to provide some basic information and complete a set of tasks</p>
        <button onClick={onStartClick}>Start</button>
      </div>
  );
}

export default App;
