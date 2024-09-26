import React from 'react';

function ThankYouPage() {
    return (
        <div className="thankyou-page">
            <h1>Thank You for Completing the Task</h1>
            <p>We appreciate your time and effort in completing this task. Your participation is valuable to us.</p>
            <button onClick={() => window.location.reload()}>Return to Start</button>  {/* Optional button to reload or return to the start */}
        </div>
    );
}

export default ThankYouPage;
