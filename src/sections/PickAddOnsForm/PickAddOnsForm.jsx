import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddOn, updateActiveStep } from '../../redux/formSlice';

function PickAddOnsForm() {
    const dispatch = useDispatch();
    const { addOns, billingCycle } = useSelector((state) => state.form);

    // Available add-ons data
    const addOnsData = [
        { id: 1, title: 'Online service', description: 'Access to multiplayer games', price: 1 },
        { id: 2, title: 'Larger storage', description: 'Extra 1TB of cloud save', price: 2 },
        { id: 3, title: 'Customizable Profile', description: 'Custom theme on your profile', price: 2 },
    ];

    // Toggle add-on selection
    const handleToggle = (addOn) => {
        dispatch(toggleAddOn(addOn));
    };

    return (
        <div className="form-step">
            <h1 className="step-title">Pick add-ons</h1>
            <p className="step-description">
                Add-ons help enhance your gaming experience.
            </p>

            <form>
                <div className="form-group addOns-container">
                    {addOnsData.map((addOn) => (
                        <label
                            key={addOn.id}
                            htmlFor={`add-on-${addOn.id}`}
                            className={`addOn-card ${addOns.some((item) => item.id === addOn.id) ? 'addOn-selected' : ''}`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleToggle(addOn);
                                }
                            }}
                            role="button"
                            aria-label={`${addOn.title}: ${addOn.description}`}
                        >
                            <input
                                type="checkbox"
                                id={`add-on-${addOn.id}`}
                                checked={addOns.some((item) => item.id === addOn.id)}
                                onChange={() => handleToggle(addOn)}
                                tabIndex={-1}
                            />
                            <div className="addOn-details">
                                <h3 className="addOn-name">{addOn.title}</h3>
                                <p className="addOn-info">{addOn.description}</p>
                            </div>
                            <span className="addOn-cost">{`+$${billingCycle === "monthly" ? addOn.price : addOn.price * 10}/${billingCycle === "monthly" ? "mo" : "yr"}`}</span>
                        </label>
                    ))}
                </div>
            </form>

            {/* Navigation Buttons */}
            <div className="form-navigation">
                <button
                    className="btn-prev"
                    onClick={() => dispatch(updateActiveStep("decrement"))}
                    aria-label="Go back to previous step"
                >
                    Go Back
                </button>
                <button
                    className="btn-next"
                    onClick={() => dispatch(updateActiveStep("increment"))}
                    aria-label="Go to next step"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}

export default PickAddOnsForm;