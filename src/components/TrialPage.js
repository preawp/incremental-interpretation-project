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

    return (
        <div>
            <TrialLayout
                trials={trials}
                currentTrialIndex={currentTrialIndex}
                totalTrials={trials.length}
                userData={userData}
                setCurrentTrialIndex={setCurrentTrialIndex}
                onComplete={onComplete}
            />
        </div>
    );
}

export default TrialPage;
