const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const app = express();
const port = 3001;
const fs = require('fs');
const cors = require('cors');

// Allow requests from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions));  // Apply the CORS middleware with options

// Middleware to parse JSON data
app.use(bodyParser.json());

// File to store userCount
const userCountFile = path.join(__dirname, 'userCount.txt');

// Function to read userCount from file
function getUserCount() {
    if (fs.existsSync(userCountFile)) {
        const storedCount = fs.readFileSync(userCountFile, 'utf-8');
        return parseInt(storedCount, 10) || 0; // Default to 0 if parsing fails
    } else {
        return 0;
    }
}

// Function to increment and update userCount in file
function incrementUserCount() {
    let userCount = getUserCount();
    userCount += 1;
    fs.writeFileSync(userCountFile, userCount.toString());
    return userCount;
}

// Ensure 'userdata' and 'data' directories exist
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

app.post('/submit-name', (req, res) => {
    const { name, age, gender, native, computer, fullscreen, timestamp} = req.body;  // Extract all form data

    // Increment user count and assign a unique user ID
    const userId = incrementUserCount();
    console.log(`Updated userCount: ${userId}`);  // Log the updated userCount


    // Define the absolute file path for user data
    const filePath = path.join(userDataDir, `userdata-${userId}.csv`);  // Save the file in userdata directory

    console.log(`Saving file to: ${filePath}`);  // Log the file path

    // Set up the CSV writer for all the form data
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'age', title: 'Age' },
            { id: 'gender', title: 'Gender' },
            { id: 'native', title: 'Native Speaker' },
            { id: 'computer', title: 'Using Computer' },
            { id: 'fullscreen', title: 'Full-screen Mode' },
            { id: 'timestamp', title: 'Timestamp' }
        ],
    });

    // Write form data (without extra 'user_id')
    csvWriter.writeRecords([{ name, timestamp,age, gender, native, computer, fullscreen}])
        .then(() => {
            console.log(`User data saved to ${filePath}`);
            // Send the userId back to the frontend
            res.status(200).json({ userId });
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Error saving form data');
        });
});

// POST route to handle trial data submission
app.post('/submit-trial-data', (req, res) => {
    const { name, trials } = req.body;  // Extract name, and trial data

    // Get the current userCount again to ensure we have the correct user ID
    const user_id = getUserCount();
    console.log(`Received trial data for user_id: ${user_id}`); 
    
    // Define the absolute file path for trial data
    const filePath = path.join(trialDataDir, `data-${user_id}.csv`);  // Save the trial data using user_id

    console.log(`Saving trial data to: ${filePath}`);  // Log the file path

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
        list: trial.list, 
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
    console.log(`Server is running on port ${port}`);  // Log the server start
});
