import React, { useState, useEffect } from 'react';
import '../styles/TrialLayout.css'; // Make sure the styles are linked

const TrialLayout = ({ trials, currentTrialIndex, totalTrials, setCurrentTrialIndex, onComplete, userData }) => {
    const [instructionStepIndex, setInstructionStepIndex] = useState(0);
    const [currentTrialChoices, setCurrentTrialChoices] = useState({
        first_choice: null,
        second_choice: null,
        third_choice: null,
        fourth_choice: null
    });
    const [userChoices, setUserChoices] = useState([]);
    const [finalSubmission, setFinalSubmission] = useState(false); // Monitor when to submit

    const currentTrial = trials[currentTrialIndex];
    const words = currentTrial.instructionSteps[instructionStepIndex].split(" ");

    // Handle image clicks and progress through instruction steps
    const handleImageClickLocal = (imageLabel) => {
        console.log(`Image clicked: ${imageLabel}, Step: ${instructionStepIndex + 1}`);

        // Save the choice based on the current instruction step
        const updatedChoices = { ...currentTrialChoices };
        switch (instructionStepIndex + 1) {
            case 1:
                updatedChoices.first_choice = imageLabel;
                break;
            case 2:
                updatedChoices.second_choice = imageLabel;
                break;
            case 3:
                updatedChoices.third_choice = imageLabel;
                break;
            case 4:
                updatedChoices.fourth_choice = imageLabel;
                break;
            default:
                break;
        }
        setCurrentTrialChoices(updatedChoices); // Save choices
        console.log("Updated trial choices after click:", updatedChoices); //log updated choices

        if (instructionStepIndex < currentTrial.instructionSteps.length - 1) {
            setInstructionStepIndex(instructionStepIndex + 1);
        } else {
            console.log("Last instruction step reached, moving to next trial.");
            handleNextTrial(updatedChoices); // Move to the next trial
        }
    };

    // Handle moving to the next trial
    const handleNextTrial = (finalChoices) => {
        console.log("Final trial choices for current trial:", finalChoices);  // Log final choices

        const trialData = {
            trial_id: trials[currentTrialIndex].trial_id,
            list: trials[currentTrialIndex].list,
            ...finalChoices  // Ensure you're passing the final choices here
        };

        console.log("Storing trial data:", trialData);  // Log trial data to be stored

        // Update userChoices by appending the current trial data
        setUserChoices(prevChoices => [...prevChoices, trialData]);  // Accumulate all trial choices

        if (currentTrialIndex < trials.length - 1) {
            setCurrentTrialIndex(currentTrialIndex + 1);
            setCurrentTrialChoices({
                first_choice: null,
                second_choice: null,
                third_choice: null,
                fourth_choice: null
            });
            setInstructionStepIndex(0);  // Reset the instruction step
        } else {
            console.log("All trials completed. Preparing to submit...");
            setFinalSubmission(true);  // Set flag to submit data after state is updated
        }
    };

    // Use effect to submit once the userChoices are fully updated
    useEffect(() => {
        if (finalSubmission) {
            submitUserChoices();  // Submit all accumulated user choices when trials are finished
            onComplete();  // Call onComplete when all trials are finished
        }
    }, [finalSubmission, userChoices]);

    // Function to submit the collected trial data
    const submitUserChoices = () => {
        const dataToSubmit = {
            name: userData.name,
            trials: userChoices  // This should now include all trials
        };

        console.log("Data to submit:", JSON.stringify(dataToSubmit, null, 2));

        fetch('http://localhost:3001/submit-trial-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit)
        })
        .then(response => {
            console.log('Response object:', response);  // Log the raw response object
            return response.json();  // Extract JSON from the response
        })
        .then(data => {
            console.log("Choices saved successfully");  // Log the actual data returned by the server
        })
        .catch(error => {
            console.error("Error saving choices");  // Log any errors
        });
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
                    <div key={image.id} className="trial-option" onClick={() => handleImageClickLocal(image.label)}>
                        <img src={image.imgSrc} alt={image.label} className="trial-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrialLayout;
