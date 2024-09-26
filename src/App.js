import React, { useState } from 'react';
import InfoForm from './components/InfoForm';
import TrialPage from './components/TrialPage';
import ThankYouPage from './components/ThankYouPage';
import './styles/App.css';

function App() {
    const [stage, setStage] = useState('welcome'); // Track the current stage
    const [userData, setUserData] = useState({});  // Track the form data (user data)

    const handleStartClick = () => {
        setStage('form'); // Move from welcome page to the form
    };

    const handleFormSubmit = (formData) => {
        setUserData(formData); // Save the form data
        setStage('trial'); // Move from the form to the trial
    };

    const handleTrialsComplete = () => {
        setStage('thankYou'); // Move to thank you page after trials
    };

    return (
        <div className="App">
            {stage === 'welcome' && <WelcomePage onStartClick={handleStartClick} />}
            {stage === 'form' && <InfoForm onSubmit={handleFormSubmit} />}
            {stage === 'trial' && <TrialPage userData={userData} onComplete={handleTrialsComplete} />}
            {stage === 'thankYou' && <ThankYouPage />}
        </div>
    );
}

function WelcomePage({ onStartClick }) {
    return (
        <div className="welcome-page">
            <h1>Welcome to the Study</h1>
            <p>Thank you for participating! In this study, you will be asked to provide some basic information and complete a set of tasks.</p>
            <button onClick={onStartClick}>Start</button>
        </div>
    );
}

export default App;
