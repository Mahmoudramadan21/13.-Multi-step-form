import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confirmationIcon from '../../assets/icon-thank-you.svg';
import { toggleBillingCycle, updateActiveStep } from '../../redux/formSlice';

export default function Summary() {
    const dispatch = useDispatch();
    const { selectedPlan, billingCycle, addOns } = useSelector(state => state.form);

    // State to track whether the confirmation message should be shown
    const [confirmState, setConfirmState] = useState(false);

    // Calculate the total price including add-ons
    const total = addOns.reduce((acc, cur) => acc + cur.price, 0) + selectedPlan.price;

    // If the user confirms, show the thank-you message
    return confirmState ? (
        <div className="confirmation-section">
            <div className="confirmation-container">
                <div className="confirmation-icon">
                    <img src={confirmationIcon} alt="Thank you!" />
                </div>
                <h2 className="confirmation-title">Thank you!</h2>
                <p className="confirmation-message">
                    Thanks for confirming your subscription! We hope you have fun using our platform.
                    If you ever need support, please feel free to email us at support@loremgaming.com.
                </p>
            </div>
        </div>
    ) : (
        <div className="form-step">
            <h1 className="step-title">Finishing up</h1>
            <p className="step-description">Double-check everything looks OK before confirming</p>

            <div className="summary-container">
                <div className="subscription-details">
                    <div className="plan-details">
                        <div className="plan-header">
                            <span className="plan-name">
                                {selectedPlan.name} ({billingCycle})
                            </span>
                            {/* Link to change the billing cycle */}
                            <a href="#" className="plan-change" onClick={() => dispatch(toggleBillingCycle())} aria-label="Change billing plan">
                                Change
                            </a>
                        </div>
                        <span className="plan-price">
                            ${selectedPlan.price}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                    </div>

                    {/* Display selected add-ons */}
                    <div className="addons">
                        {addOns.map((addOn, index) => (
                            <div className="addon" key={index}>
                                <span className="addon-name">{addOn.title}</span>
                                <span className="addon-price">
                                    +${addOn.price}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display total price */}
                <div className="total">
                    <span className="total-text">Total (per {billingCycle === 'monthly' ? 'month' : 'year'})</span>
                    <span className="total-price">
                        +${total}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                </div>
            </div>

            <div className="form-navigation">
                {/* Button to go back to the previous step */}
                <button className="btn-prev" onClick={() => dispatch(updateActiveStep('decrement'))} aria-label="Go back to previous step">
                    Go Back
                </button>
                {/* Button to confirm the selection */}
                <button
                    className="btn-next confirm-btn"
                    onClick={() => setConfirmState(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setConfirmState(true);
                        }
                    }}
                    aria-label="Confirm subscription"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
