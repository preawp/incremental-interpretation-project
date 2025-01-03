import React, { useState, useEffect } from 'react';
import TrialLayout from './TrialLayout';

function TrialPage({ userData, onComplete }) {
    const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
    const [trials, setTrials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("UserData in TrialPage:", userData);

        // Trial Assignment Logic
        const assignTrials = (userId) => {
            const userGroup = userId % 2 === 0 ? 'alpha' : 'beta';
            console.log(`Assigning user ${userId} to group ${userGroup}`);

        //critial trials for alpha: 1,3,5,8,10,12
        const criticalTrialsAlpha = [
            {
                trial_id: 1,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the sleepy",
                    "Click on the picture of the sleepy woman",
                    "Click on the picture of the sleepy woman with the red hair."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-1/sleep_sleepy_red_hair.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-1/sleep_asleep_dark_hair.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-1/sleep_awake_brown_hair.png" },
                    { id: 4, label: "Distractor", imgSrc: "/items/item-1/distractor13.png" }
                ]
            },
            {
                trial_id: 3,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the breezy",
                    "Click on the picture of the breezy weather",
                    "Click on the picture of the breezy weather with the yellow flag."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-3/flag_windy_yellow_flag.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-3/distractor1.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-3/flag_tornado_purple_flag.png" },
                    { id: 4, label: "Contrast", imgSrc: "/items/item-3/flag_still_red_flag.png" }
                ]
            },
            {
                trial_id: 5,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the drizzly",
                    "Click on the picture of the drizzly weather",
                    "Click on the picture of the drizzly weather with the orange bird."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-5/weather_tstorm_green_bird.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-5/weather_drizzling_orange_bird.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-5/weather_sunny_black_bird.png" },
                    { id: 4, label: "Distractor", imgSrc: "/items/item-5/distractor15.png" }
                ]
            },
            {
                trial_id: 8,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the chubby",
                    "Click on the picture of the chubby man",
                    "Click on the picture of the chubby man with the green T-shirt."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-8/physique_obese_yellow_shirt.png" },
                    { id: 2, label: "Distractor-1", imgSrc: "/items/item-8/distractor11.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-8/physique_chubby_green_shirt.png" },
                    { id: 4, label: "Distractor-2", imgSrc: "/items/item-8/distractor5.png" }
                ]
            },
            {
                trial_id: 10,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the content",
                    "Click on the picture of the content woman",
                    "Click on the picture of the content woman with the brown hair."
                ],
                images: [
                    { id: 1, label: "Distractor-1", imgSrc: "/items/item-10/distractor7.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-10/woman_ecstatic_black_hair.png" },
                    { id: 3, label: "Distractor-2", imgSrc: "/items/item-10/distractor2.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-10/woman_content_brown_hair.png" }
                ]
            },
            {
                trial_id: 12,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the warm",
                    "Click on the picture of the warm water",
                    "Click on the picture of the warm water with the purple spoon."
                ],
                images: [
                    { id: 1, label: "Distractor-2", imgSrc: "/items/item-12/distractor20.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-12/water_warm_purple_spoon.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-12/distractor12.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-12/water_boiling_yellow_spoon.png" }
                ]
            }

        ];
        //critical trials for beta: 2,4,6,7,9,11
        const criticalTrialsBeta = [
            {
                trial_id: 2,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the sleepy",
                    "Click on the picture of the sleepy woman",
                    "Click on the picture of the sleepy woman with the red hair."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-2/sleep_sleepy_red_hair.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-2/sleep_asleep_dark_hair.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-2/distractor4.png" },
                    { id: 4, label: "Distractor-2", imgSrc: "/items/item-2/distractor13.png" }
                ]
            },
            {
                trial_id: 4,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the breezy",
                    "Click on the picture of the breezy weather",
                    "Click on the picture of the breezy weather with the yellow flag."
                ],
                images: [
                    { id: 1, label: "Distractor-1", imgSrc: "/items/item-4/distractor18.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-4/flag_tornado_purple_flag.png" },
                    { id: 3, label: "Distractor-2", imgSrc: "/items/item-4/distractor1.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-4/flag_windy_yellow_flag.png" }
                ]
            },
            {
                trial_id: 6,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the drizzly",
                    "Click on the picture of the drizzly weather",
                    "Click on the picture of the drizzly weather with the orange bird."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-6/weather_drizzling_orange_bird.png" },
                    { id: 2, label: "Distractor-2", imgSrc: "/items/item-6/distractor15.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-6/weather_tstorm_green_bird.png" },
                    { id: 4, label: "Distractor-1", imgSrc: "/items/item-6/distractor3.png" }
                ]
            },
            {
                trial_id: 7,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the chubby",
                    "Click on the picture of the chubby man",
                    "Click on the picture of the chubby man with the green T-shirt."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-7/physique_chubby_green_shirt.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-7/distractor5.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-7/physique_thin_red_shirt.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-7/physique_obese_yellow_shirt.png" }
                ]
            },
            {
                trial_id: 9,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the content",
                    "Click on the picture of the content woman",
                    "Click on the picture of the content woman with the brown hair."
                ],
                images: [
                    { id: 1, label: "Distractor", imgSrc: "/items/item-9/distractor2.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-9/woman_content_brown_hair.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-9/woman_ecstatic_black_hair.png" },
                    { id: 4, label: "Contrast", imgSrc: "/items/item-9/woman_sad_blond_hair.png" }
                ]
            },
            {
                trial_id: 11,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the warm",
                    "Click on the picture of the warm water",
                    "Click on the picture of the warm water with the purple spoon."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-11/water_boiling_yellow_spoon.png" },
                    { id: 2, label: "Contrast", imgSrc: "/items/item-11/water_frozen_blue_spoon.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-11/water_warm_purple_spoon.png" },
                    { id: 4, label: "Distractor", imgSrc: "/items/item-11/distractor20.png" }
                ]
            },
        ];

        const fillerTrials = [
            {
                trial_id: 13,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the excellent",
                    "Click on the picture of the excellent grade",
                    "Click on the picture of the excellent grade with the green writing."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-13/grades_A+_green_writing.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-13/distractor14.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-13/grades_F_purple_writing.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-13/grades_B_blue_writing.png" }
                ]
            },
            {
                trial_id: 14,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the failing",
                    "Click on the picture of the failing grade",
                    "Click on the picture of the failing grade with the pink writing."
                ],
                images: [
                    { id: 1, label: "Contrast", imgSrc: "/items/item-14/grades_B_blue_writing.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-14/grades_A+_green_writing.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-14/grades_F_purple_writing.png" },
                    { id: 4, label: "Distractor", imgSrc: "/items/item-14/distractor33.png" }
                ]
            },
            {
                trial_id: 15,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the wooden",
                    "Click on the picture of the wooden chair",
                    "Click on the picture of the wooden chair with the brown finish."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-15/distractor21.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-15/grades_A+_green_writing.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-15/grades_F_purple_writing.png" },
                    { id: 4, label: "Distractor", imgSrc: "/items/item-15/grades_B_blue_writing.png" }
                ]
            },
            {
                trial_id: 16,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the full",
                    "Click on the picture of the full bathtub",
                    "Click on the picture of the full bathtub with the green rubber duck."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-16/tub_low_orange_duck.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-16/tub_high_green_duck.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-16/distractor38.png" },
                    { id: 4, label: "Distractor-2", imgSrc: "/items/item-16/distractor16.png" }
                ]
            },
            {
                trial_id: 17,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the empty",
                    "Click on the picture of the empty bathtub",
                    "Click on the picture of the empty bathtub with the yellow rubber duck."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-17/tub_empty_yellow_duck.png" },
                    { id: 2, label: "Distractor-1", imgSrc: "/items/item-17/distractor8.png" },
                    { id: 3, label: "Distractor-2", imgSrc: "/items/item-17/distractor34.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-17/tub_low_orange_duck.png" }
                ]
            },
            {
                trial_id: 18,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the thorny",
                    "Click on the picture of the thorny rose",
                    "Click on the picture of the thorny rose with the red petals."
                ],
                images: [
                    { id: 1, label: "Distractor-1", imgSrc: "/items/item-18/tub_low_orange_duck.png" },
                    { id: 2, label: "Distractor-2", imgSrc: "/items/item-18/distractor32.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-18/tub_high_green_duck.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-18/distractor9.png" }
                ]
            },
            {
                trial_id: 19,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the wide open",
                    "Click on the picture of the wide open door",
                    "Click on the picture of the wide open door with the green carpet."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-19/door_open_green_carpet.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-19/door_ajar_red_carpet.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-19/distractor23.png" },
                    { id: 4, label: "Distractor-2", imgSrc: "/items/item-19/distractor6.png" }
                ]
            },
            {
                trial_id: 20,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the closed",
                    "Click on the picture of the closed door",
                    "Click on the picture of the closed door with the purple carpet."
                ],
                images: [
                    { id: 1, label: "Distractor-2", imgSrc: "/items/item-20/distractor39.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-20/door_ajar_red_carpet.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-20/distractor35.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-20/door_shut_purple_carpet.png" }
                ]
            },
            {
                trial_id: 21,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the friendly",
                    "Click on the picture of the friendly cat",
                    "Click on the picture of the friendly cat with the orange fur."
                ],
                images: [
                    { id: 1, label: "Distractor-1", imgSrc: "/items/item-21/door_ajar_red_carpet.png" },
                    { id: 2, label: "Distractor-2", imgSrc: "/items/item-21/distractor10.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-21/distractor17.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-21/door_open_green_carpet.png" }
                ]
            },
            {
                trial_id: 22,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the overripe",
                    "Click on the picture of the overripe banana",
                    "Click on the picture of the overripe banana with the orange apple."
                ],
                images: [
                    { id: 1, label: "Distractor-2", imgSrc: "/items/item-22/distractor19.png" },
                    { id: 2, label: "Distractor-1", imgSrc: "/items/item-22/distractor24.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-22/banana_overripe_yellow_apple.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-22/banana_ripe_green_apple.png" }
                ]
            },
            {
                trial_id: 23,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the unripe",
                    "Click on the picture of the unripe banana",
                    "Click on the picture of the unripe banana with the red apple."
                ],
                images: [
                    { id: 1, label: "Distractor-2", imgSrc: "/items/item-23/distractor31.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-23/banana_unripe_red_apple.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-23/distractor36.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-23/banana_ripe_green_apple.png" }
                ]
            },
            {
                trial_id: 24,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the ballet",
                    "Click on the picture of the ballet shoes",
                    "Click on the picture of the ballet shoes with the pink ribbon."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-24/distractor25.png" },
                    { id: 2, label: "Distractor-2", imgSrc: "/items/item-24/distractor37.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-24/banana_overripe_yellow_apple.png" },
                    { id: 4, label: "Contrast", imgSrc: "/items/item-24/banana_ripe_green_apple.png" }
                ]
            },
            {
                trial_id: 25,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the young",
                    "Click on the picture of the young woman",
                    "Click on the picture of the young woman with the ginger hair."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-25/woman_baby_brown_hair.png" },
                    { id: 2, label: "Target", imgSrc: "/items/item-25/woman_young_ginger_hair.png" },
                    { id: 3, label: "Distractor", imgSrc: "/items/item-25/distractor22.png" },
                    { id: 4, label: "Contrast", imgSrc: "/items/item-25/woman_old_gray_hair.png" }
                ]
            },
            {
                trial_id: 26,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the old",
                    "Click on the picture of the old woman",
                    "Click on the picture of the old woman with the gray hair."
                ],
                images: [
                    { id: 1, label: "Contrast", imgSrc: "/items/item-26/woman_baby_brown_hair.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-26/distractor26.png" },
                    { id: 3, label: "Target", imgSrc: "/items/item-26/woman_old_gray_hair.png" },
                    { id: 4, label: "Competitor", imgSrc: "/items/item-26/woman_young_ginger_hair.png" }
                ]
            },
            {
                trial_id: 27,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the metal",
                    "Click on the picture of the metal knitting needles",
                    "Click on the picture of the metal knitting needles with the blue yarn."
                ],
                images: [
                    { id: 1, label: "Distractor-2", imgSrc: "/items/item-27/woman_baby_brown_hair.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-27/woman_young_ginger_hair.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-27/woman_old_gray_hair.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-27/distractor27.png" }
                ]
            },
            {
                trial_id: 28,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the perfect",
                    "Click on the picture of the perfect accuracy",
                    "Click on the picture of the perfect accuracy with the orange arrows."
                ],
                images: [
                    { id: 1, label: "Target", imgSrc: "/items/item-28/target_perfect_orange_feathers.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-28/distractor28.png" },
                    { id: 3, label: "Competitor", imgSrc: "/items/item-28/target_fair_green_feathers.png" },
                    { id: 4, label: "Contrast", imgSrc: "/items/item-28/target_failure_blue_feathers.png" }
                ]
            },
            {
                trial_id: 29,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the bad",
                    "Click on the picture of the bad accuracy",
                    "Click on the picture of the bad accuracy with the blue arrows."
                ],
                images: [
                    { id: 1, label: "Competitor", imgSrc: "/items/item-29/target_perfect_orange_feathers.png" },
                    { id: 2, label: "Distractor", imgSrc: "/items/item-29/distractor29.png" },
                    { id: 3, label: "Contrast", imgSrc: "/items/item-29/target_fair_green_feathers.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-29/target_failure_blue_feathers.png" }
                ]
            },
            {
                trial_id: 30,
                list: 1,
                instructionSteps: [
                    "Click on the picture of the",
                    "Click on the picture of the open",
                    "Click on the picture of the open umbrella",
                    "Click on the picture of the open umbrella with the red fabric."
                ],
                images: [
                    { id: 1, label: "Contrast", imgSrc: "/items/item-30/target_failure_blue_feathers.png" },
                    { id: 2, label: "Competitor", imgSrc: "/items/item-30/target_perfect_orange_feathers.png" },
                    { id: 3, label: "Distractor-1", imgSrc: "/items/item-30/target_fair_green_feathers.png" },
                    { id: 4, label: "Target", imgSrc: "/items/item-30/distractor30.png" }
                ]
            } 
     ];

     //Dynamic spaceing + Fisher-Yates Shuffle -> flexible + randomized
     //min of 3 spacing between critical trials restricted cluttered like 1-3 fillers between critical trials, and more on the filler trials, more variety
     

     //prepare the critical trials based on user group
     const criticalTrials = userGroup === 'alpha' ? criticalTrialsAlpha : criticalTrialsBeta;

     // Fisher-Yates Shuffle Algorithm-> unbiased shuffle, O(n) time complexity
     //[a, b, c]-> (abc, acb, bac, bca, cab, cba) equally likely
     const fisherYatesShuffle = (array) => {
        const arr = [...array]; //copy original array
        for (let i = arr.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index in range [0, i]
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]; // Swap elements
        }
        return arr;
    };

    // Dynamic critical trial placement with minimum spacing
    const distributeCriticalTrialsWithDynamicSpacing = (criticalTrials, fillerTrials, totalTrials, minSpacing) => {
        //null vals
        const trialDistribution = new Array(totalTrials).fill(null);

        // Shuffle critical and filler trials
        const shuffledCriticalTrials = fisherYatesShuffle(criticalTrials);
        const shuffledFillers = fisherYatesShuffle(fillerTrials);

        let placedIndices = []; // Track where critical trials are placed

        // Place critical trials dynamically with constraints 
        shuffledCriticalTrials.forEach((trial) => {
            let position;
            do {
                position = Math.floor(Math.random() * totalTrials);
            } while (
                trialDistribution[position] || // Position already occupied
                placedIndices.some((index) => Math.abs(index - position) < minSpacing) // Too close to another critical trial
            );

            trialDistribution[position] = trial;
            placedIndices.push(position);
        });

        // Fill remaining slots with fillers
        let fillerIndex = 0;
        for (let i = 0; i < trialDistribution.length; i++) {
            if (!trialDistribution[i]) {
                trialDistribution[i] = shuffledFillers[fillerIndex++];
            }
        }

        return trialDistribution;
    };

    // Parameters for trial distribution
    const totalTrials = 24; 
    const minSpacing = 3; // Minimum spacing between critical trials

    // Generate final trial distribution
    const trialDistribution = distributeCriticalTrialsWithDynamicSpacing(
        criticalTrials,
        fillerTrials,
        totalTrials,
        minSpacing
    );

    console.log("Final Trial Distribution:", trialDistribution); // Debug: Display final trial list
    return trialDistribution; 
    };

    // For debugging, will work on real userid
    const userId = 41; // Example user ID: even -> 'alpha', odd -> 'beta'
    console.log(`Generated userId: ${userId}`); 

    // Assign trials and update state
    const assignedTrials = assignTrials(userId);
    setTrials(assignedTrials); 
    setLoading(false);
    }, [userData]);

    if (loading) {
    return <div>Loading trials...</div>; 
    }

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