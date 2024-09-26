import React, { useState } from 'react';
import '../styles/TrialLayout.css'; // Make sure the styles are linked

const TrialLayout = ({ trials, currentTrialIndex, totalTrials, setCurrentTrialIndex, onComplete }) => {
    const [instructionStepIndex, setInstructionStepIndex] = useState(0);

    const currentTrial = trials[currentTrialIndex];
    const words = currentTrial.instructionSteps[instructionStepIndex].split(" ");

    const handleImageClick = () => {
        if (instructionStepIndex < currentTrial.instructionSteps.length - 1) {
            setInstructionStepIndex(instructionStepIndex + 1);
        } else {
            handleNextTrial();
        }
    };

    const handleNextTrial = () => {
        if (currentTrialIndex < trials.length - 1) {
            setCurrentTrialIndex(currentTrialIndex + 1);
            setInstructionStepIndex(0);
        } else {
            onComplete(); // Call the onComplete function to go to the Thank You page
        }
    };

    return (
        <div className="trial-layout">
            <div className="trial-number">
                <p>Trial {currentTrialIndex + 1} of {totalTrials}</p>
            </div>
            <div className="instruction">
                {words.map((word, index) => (
                    <span key={index} className={`word word-appear`}>{word}</span>
                ))}
            </div>
            <div className="trial-grid">
                {currentTrial.images.map((image) => (
                    <div key={image.id} className="trial-option" onClick={handleImageClick}>
                        <img src={image.imgSrc} alt={`Image ${image.id}`} className="trial-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrialLayout;
