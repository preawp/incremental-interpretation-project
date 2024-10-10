const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const app = express();
const port = 3001;
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');  // Import the uuid library for unique user IDs, work later

// Allow requests from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions));  // Apply the CORS middleware with options

// Middleware to parse JSON data
app.use(bodyParser.json());

let userCount = 0;  // Track user IDs for unique filenames

app.get('/submit-name', (req, res) => {
    res.send('This is a GET request to /submit-name. Use POST to submit data.');
});

// Ensure 'userdata' directory exists
const userDataDir = path.join(__dirname, 'userdata');
const trialDataDir = path.join(__dirname, 'data');

if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir);  // Create the folder if it doesn't exist
    console.log('Created "userdata" directory');
}
if (!fs.existsSync(trialDataDir)) {
    fs.mkdirSync(trialDataDir);  // Create 'data' directory if it doesn't exist
    console.log('Created "data" directory');
}


// POST route to handle form submission
app.post('/submit-name', (req, res) => {
    const { name, age, gender, native, computer, fullscreen } = req.body;  // Extract all form data

    // Increment user count for unique file naming
    userCount += 1;

    // Define the absolute file path
    const filePath = path.join(userDataDir, `userdata-${userCount}.csv`);  // Save the file in userdata directory

    console.log(`Saving file to: ${filePath}`);  // Use template literals for logging

    // Set up the CSV writer for all the form data
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'age', title: 'Age' },
            { id: 'gender', title: 'Gender' },
            { id: 'native', title: 'Native Speaker' },
            { id: 'computer', title: 'Using Computer' },
            { id: 'fullscreen', title: 'Full-screen Mode' }
        ],
    });

    // Write all form data to the CSV file
    csvWriter.writeRecords([{ name, age, gender, native, computer, fullscreen }])
        .then(() => {
            console.log(`User data saved to ${filePath}`);  // Use template literals for logging
            res.status(200).send(`Form data saved to ${filePath}`);  // Use template literals in response
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Error saving form data');
        });
});


// POST route to handle trial data submission
app.post('/submit-trial-data', (req, res) => {
    const { user_id, name, trials } = req.body;  // Extract user_id, name, and trial data

    // Define the absolute file path for trial data
    const filePath = path.join(trialDataDir, `data-${user_id}.csv`);  // Save the trial data using user_id

    console.log(`Saving trial data to: ${filePath}`);  // Use template literals for logging

    // Set up the CSV writer with the correct headers for trial data
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'user_id', title: 'User ID' },
            { id: 'name', title: 'Name' },
            { id: 'list', title: 'List' },
            { id: 'trial_id', title: 'Trial ID' },
            { id: 'first_choice', title: 'First Choice' },
            { id: 'second_choice', title: 'Second Choice' },
            { id: 'third_choice', title: 'Third Choice' },
            { id: 'fourth_choice', title: 'Fourth Choice' }
        ]
    });

    // Prepare records for CSV
    const records = trials.map(trial => ({
        user_id: user_id,
        name: name,
        list: trial.list,  // Assuming each trial has a 'list' attribute
        trial_id: trial.trial_id,
        first_choice: trial.first_choice,
        second_choice: trial.second_choice,
        third_choice: trial.third_choice,
        fourth_choice: trial.fourth_choice
    }));

    // Write the trial data to the CSV file
    csvWriter.writeRecords(records)
        .then(() => {
            console.log(`Trial data saved to ${filePath}`);
            res.status(200).send(`Trial data saved to ${filePath}`);
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Error saving trial data');
        });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  // Use template literals for logging
});
