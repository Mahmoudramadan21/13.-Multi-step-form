import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveStep, updatePersonalInfo } from '../../redux/formSlice';

function PersonalInfoForm() {
    const dispatch = useDispatch();
    const personalInfo = useSelector((state) => state.form.personalInfo);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // Validation functions for name, email, and phone
    const validateName = (name) => {
        if (!name) return "Name is required.";
        if (!/^[A-Za-z\s]+$/.test(name)) return "Name should contain only letters and spaces.";
        return "";
    };

    const validateEmail = (email) => {
        if (!email) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
        return "";
    };

    const validatePhone = (phone) => {
        if (!phone) return "Phone number is required.";
        if (!/^\+?\d{10,15}$/.test(phone)) return "Invalid phone number format.";
        return "";
    };

    // Handle input changes and validate
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));

        let errorMessage = "";
        switch (name) {
            case "name":
                errorMessage = validateName(value);
                break;
            case "email":
                errorMessage = validateEmail(value);
                break;
            case "phone":
                errorMessage = validatePhone(value);
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: errorMessage });
    };

    // Validate the entire form
    const validateForm = () => {
        const nameError = validateName(personalInfo.name);
        const emailError = validateEmail(personalInfo.email);
        const phoneError = validatePhone(personalInfo.phone);

        setErrors({
            name: nameError,
            email: emailError,
            phone: phoneError,
        });

        return !nameError && !emailError && !phoneError;
    };

    // Move to the next step if form is valid
    const handleNext = () => {
        if (validateForm()) {
            dispatch(updatePersonalInfo(personalInfo));
            dispatch(updateActiveStep("increment"));
        }
    };

    return (
        <div className="form-step">
            <h1 className="step-title">Personal Info</h1>
            <p className="step-description">Please provide your name, email address, and phone number.</p>

            <form>
                {/* Name Input */}
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-header">
                            <label htmlFor="name" className="input-label">Name</label>
                            {errors.name && <p id="name-error" className="error-message">{errors.name}</p>}
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={personalInfo.name}
                            onChange={handleChange}
                            className={`input-form ${errors.name ? 'input-error' : ''}`}
                            style={errors.name ? { borderColor: "#aa2b2b" } : undefined}
                            placeholder="Your Name"
                            aria-describedby="name-error"
                        />
                    </div>
                    {/* Email Input */}
                    <div className="input-group">
                        <div className="input-header">
                            <label htmlFor="email" className="input-label">Email</label>
                            {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handleChange}
                            className={`input-form ${errors.email ? 'input-error' : ''}`}
                            style={errors.email ? { borderColor: "#aa2b2b" } : undefined}
                            placeholder="Email Address"
                            aria-describedby="email-error"
                        />
                    </div>
                    {/* Phone Input */}
                    <div className="input-group">
                        <div className="input-header">
                            <label htmlFor="phone" className="input-label">Phone Number</label>
                            {errors.phone && <p id="phone-error" className="error-message">{errors.phone}</p>}
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handleChange}
                            className={`input-form ${errors.phone ? 'input-error' : ''}`}
                            style={errors.phone ? { borderColor: "#aa2b2b" } : undefined}
                            placeholder="Phone Number"
                            aria-describedby="phone-error"
                        />
                    </div>
                </div>
            </form>

            {/* Navigation Buttons */}
            <div className="form-navigation">
                <button
                    className={`btn-prev hidden`}
                >
                    Go Back
                </button>
                <button
                    className="btn-next"
                    onClick={handleNext}
                    aria-label="Go to next step"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}

export default PersonalInfoForm;