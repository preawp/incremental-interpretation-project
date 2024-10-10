import React, { useState } from 'react';
import TrialLayout from './TrialLayout';

const trials = [
    {
        trial_id: 1,
        list: 1,
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
        trial_id: 2,
        list: 1,
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

function TrialPage({ userData, onComplete }) {
    const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
    const [userChoices, setUserChoices] = useState([]);  // Track user choices for each trial

   // Object to store the current trial choices
   const [currentTrialChoices, setCurrentTrialChoices] = useState({
    first_choice: null,
    second_choice: null,
    third_choice: null,
    fourth_choice: null
});

const handleImageClick = (imageLabel, step) => {
    // Save the choice based on the step (1 to 4)
    const updatedChoices = { ...currentTrialChoices };
    switch (step) {
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
    setCurrentTrialChoices(updatedChoices); 
    // Log the choices for debugging
    console.log("Updated trial choices:", updatedChoices);

};

const handleNextTrial = () => {
    // Store the current trial's choices into userChoices array
    const trialData = {
        list: trials[currentTrialIndex].list,
        trial_id: trials[currentTrialIndex].trial_id,
        ...currentTrialChoices  // Store first_choice, second_choice, etc.
    };

    setUserChoices([...userChoices, trialData]);  // Add the current trial's choices to userChoices

    if (currentTrialIndex < trials.length - 1) {
        setCurrentTrialIndex(currentTrialIndex + 1);
        setCurrentTrialChoices({
            first_choice: null,
            second_choice: null,
            third_choice: null,
            fourth_choice: null
        });  // Reset choices for the next trial
    } else {
        submitUserChoices();  // Submit all user choices when trials are finished
        onComplete();  // Move to "Thank You" page when trials are finished
    }
};

const submitUserChoices = () => {
    const dataToSubmit = {
        user_id: userData.userId,  // Use 'user_id' to match the backend
        name: userData.name,
        trials: userChoices.map((choice, index) => ({
            trial_id: trials[index].trial_id,
            list: trials[index].list,
            first_choice: choice.first_choice,
            second_choice: choice.second_choice,
            third_choice: choice.third_choice,
            fourth_choice: choice.fourth_choice
        }))  // Structure trials data correctly
    };

    fetch('http://localhost:3001/submit-trial-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit)  // Send the corrected structure
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to save choices');
        }
    })
    .then(data => {
        console.log("Choices saved successfully", data);
    })
    .catch(error => {
        console.error("Error saving choices:", error);
    });
};


    return (
        <div>
            <TrialLayout
                trials={trials}
                currentTrialIndex={currentTrialIndex}
                totalTrials={trials.length}
                setCurrentTrialIndex={setCurrentTrialIndex}
                handleImageClick={handleImageClick}
                handleNextTrial={handleNextTrial}
                onComplete={onComplete}
            />
        </div>
    );
}
export default TrialPage;
