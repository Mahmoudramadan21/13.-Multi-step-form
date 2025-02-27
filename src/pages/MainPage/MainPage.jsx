import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import './MainPage.css';
import PersonalInfoForm from '../../sections/PersonalInfoFrom/PersonalInfoForm';
import SelectPlanForm from '../../sections/SelectPlanForm/SelectPlanForm';
import PickAddOnsForm from '../../sections/PickAddOnsForm/PickAddOnsForm';
const Summary = lazy(() => import('../../sections/SummarySection/SummarySection')); // Lazy load the Summary component

export default function MainPage() {
    // Steps for the multi-step form
    const steps = [
        { number: 1, title: "Your Info" },
        { number: 2, title: "Select plan" },
        { number: 3, title: "Add-ons" },
        { number: 4, title: "Summary" },
    ];

    // Get the active step from Redux store
    const activeStep = useSelector((state) => state.form.activeStep);

    return (
        <div className="multi-side-form">
            {/* Sidebar showing progress steps */}
            <nav className="form-sidebar" aria-label="Progress steps">
                <ul role="list">
                    {steps.map((step) => (
                        <li key={step.number} role="listitem">
                            <button
                                className={`step-container ${step.number === activeStep ? "step-container--active" : ""}`}
                                aria-current={step.number === activeStep ? "step" : undefined}
                                aria-label={`Step ${step.number}: ${step.title}`}
                                tabIndex={0}
                            >
                                <span className={`step-number ${step.number === activeStep ? "step-number--active" : ""}`}>
                                    {step.number}
                                </span>
                                <div>
                                    <p className="step-subtitle">STEP {step.number}</p>
                                    <p className="step-title">{step.title}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Render the active step component */}
            <Suspense fallback={<div className='form-step'>Loading...</div>}>
                {activeStep === 1 && <PersonalInfoForm />}
                {activeStep === 2 && <SelectPlanForm />}
                {activeStep === 3 && <PickAddOnsForm />}
                {activeStep === 4 && <Summary />}
            </Suspense>
        </div>
    );
}