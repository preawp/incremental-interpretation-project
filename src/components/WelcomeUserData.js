import React, { useState } from 'react';

function WelcomeUserData({ onSubmit }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, age });  // Send name and age to parent
    };

    return (
        <div className="welcome-page">
            <h1>Welcome to the Trial Task</h1>
            <p>In this task, you will be asked to click on images based on instructions given incrementally.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </label>
                <button type="submit">Start</button>
            </form>
        </div>
    );
}

export default WelcomeUserData;
