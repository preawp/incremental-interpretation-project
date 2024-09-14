import React, { useState } from 'react';
import '../styles/TrialLayout.css'; // Correct CSS import

const TrialLayout = ({ trials, currentTrialIndex, totalTrials, setCurrentTrialIndex }) => {
    const [instructionStepIndex, setInstructionStepIndex] = useState(0);
    const [currentInstruction, setCurrentInstruction] = useState(trials[currentTrialIndex].instructionSteps[0]);

    const currentTrial = trials[currentTrialIndex];

    const handleImageClick = () => {
        if (instructionStepIndex < currentTrial.instructionSteps.length - 1) {
            // Reveal next part of the instruction
            setInstructionStepIndex(instructionStepIndex + 1);
            setCurrentInstruction(currentTrial.instructionSteps[instructionStepIndex + 1]);
        } else {
            // When all steps are revealed, move to the next trial
            handleNextTrial();
        }
    };

    const handleNextTrial = () => {
        if (currentTrialIndex < trials.length - 1) {
            // Move to the next trial and reset instruction steps
            setCurrentTrialIndex(currentTrialIndex + 1);
            setInstructionStepIndex(0);
            setCurrentInstruction(trials[currentTrialIndex + 1].instructionSteps[0]);
        } else {
            alert("All trials completed!");
        }
    };

    return (
        <div className="trial-layout">
            <div className="trial-number">
                <p>Trial {currentTrialIndex + 1} of {totalTrials}</p> {/* Display current trial number */}
            </div>
            <div className="instruction">
                <p>{currentInstruction}</p>
            </div>
            <div className="trial-grid">
                {currentTrial.images.map((image, index) => (
                    <div key={image.id} className="trial-option" onClick={handleImageClick}>
                        <img src={image.imgSrc} alt={`Image ${index}`} className="trial-image" />
                        {/* Removed image number label */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrialLayout;
