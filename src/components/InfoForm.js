import React, { useState } from 'react';
import '../styles/InfoForm.css';  // Link to your CSS styles

function InfoForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        native: '',
        computer: '',
        fullscreen: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Send the form data to the parent component
    };

    return (
        <div id="shade">
            <div id="content">
                <div id="pub">
                    <h1>Participant Information</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </label><br />

                        {/* Age Input */}
                        <label>
                            Age:
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                        </label><br />

                        {/* Gender Question (Horizontal) */}
                        <label>What is your gender?</label>
                        <div className="radio-group-horizontal">
                            <label><input type="radio" name="gender" value="female" onChange={handleChange} required /> Female</label>
                            <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
                            <label><input type="radio" name="gender" value="other" onChange={handleChange} /> Other</label>
                        </div><br />

                        {/* Native Speaker Question */}
                        <label>Are you a native speaker of English?</label>
                        <div className="radio-group-horizontal">
                            <label><input type="radio" name="native" value="yes" onChange={handleChange} required /> Yes</label>
                            <label><input type="radio" name="native" value="no" onChange={handleChange} /> No</label>
                        </div><br />

                        {/* Laptop/Desktop Question */}
                        <label>Are you using a laptop/desktop computer?</label>
                        <div className="radio-group-horizontal">
                            <label><input type="radio" name="computer" value="yes" onChange={handleChange} required /> Yes</label>
                            <label><input type="radio" name="computer" value="no" onChange={handleChange} /> No</label>
                        </div><br />

                        {/* Full-screen Mode Question */}
                        <label>Are you in full-screen mode on your browser?</label>
                        <div className="radio-group-horizontal">
                            <label><input type="radio" name="fullscreen" value="yes" onChange={handleChange} required /> Yes</label>
                            <label><input type="radio" name="fullscreen" value="no" onChange={handleChange} /> No</label>
                        </div><br />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InfoForm;
