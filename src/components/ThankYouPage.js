import React from 'react';
import '../styles/App.css';

function ThankYouPage() {
    return (
        <div className="welcome-page">
            <h1>Thank You for Completing the Task</h1>
            <p>We appreciate your time and effort in completing this task. Your participation is valuable to us.</p>
            <button onClick={() => window.location.reload()}>Return to Start</button>
        </div>
    );
}

export default ThankYouPage;
