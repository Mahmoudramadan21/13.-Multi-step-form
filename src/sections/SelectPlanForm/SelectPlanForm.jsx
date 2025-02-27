import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arcadeIcon from '../../assets/icon-arcade.svg';
import advancedIcon from '../../assets/icon-advanced.svg';
import proIcon from '../../assets/icon-pro.svg';
import { selectPlan, toggleBillingCycle, updateActiveStep } from '../../redux/formSlice';

function SelectPlanForm() {
    const dispatch = useDispatch();
    const { selectedPlan, billingCycle } = useSelector((state) => state.form);

    // Define available plans
    const plans = [
        { id: 'arcade', name: 'Arcade', price: 9, icon: arcadeIcon },
        { id: 'advanced', name: 'Advanced', price: 12, icon: advancedIcon },
        { id: 'pro', name: 'Pro', price: 15, icon: proIcon },
    ];

    // Handle plan selection
    const handlePlanChange = (plan) => {
        dispatch(selectPlan(plan));
    };

    // Toggle between monthly and yearly billing cycles
    const handleBillingCycleToggle = () => {
        dispatch(toggleBillingCycle());
    };

    return (
        <div className="form-step">
            <h1 className="step-title">Select your Plan</h1>
            <p className="step-description">
                You have the option of monthly or yearly billing.
            </p>

            <form>
                <div className="form-group">
                    <div className="plan-options">
                        {plans.map((plan) => (
                            <div
                                className="plan-options__item"
                                key={plan.id}
                                tabIndex={0} // Make it focusable for keyboard navigation
                                onClick={() => handlePlanChange(plan)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handlePlanChange(plan);
                                    }
                                }}
                                role="button"
                                aria-label={`Select ${plan.name} plan for $${billingCycle === 'yearly' ? plan.price * 10 : plan.price} per ${billingCycle === 'yearly' ? 'year' : 'month'}`}
                            >
                                <input
                                    type="radio"
                                    name="plan-options"
                                    id={`plan-option-${plan.id}`}
                                    checked={selectedPlan.id === plan.id}
                                    onChange={() => handlePlanChange(plan)}
                                    style={{ opacity: 0, position: 'absolute' }} // Hide the input visually
                                />
                                <label htmlFor={`plan-option-${plan.id}`}>
                                    <img src={plan.icon} className="item__icon" alt={`${plan.name} Plan Icon`} />
                                    <div className="item__details">
                                        <h5 className="item__name">{plan.name}</h5>
                                        <p className="item__price">
                                            ${billingCycle === 'yearly' ? plan.price * 10 : plan.price}/{billingCycle === 'yearly' ? 'yr' : 'mo'}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Toggle switch for billing cycle */}
                    <div className="billing-toggle">
                        <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="billing-toggle"
                                checked={billingCycle === 'yearly'}
                                onChange={handleBillingCycleToggle}
                                aria-label="Toggle billing cycle between monthly and yearly"
                            />
                            <label
                                htmlFor="billing-toggle"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleBillingCycleToggle();
                                    }
                                }}
                                tabIndex={0}>
                            </label>
                        </div>
                        <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly</span>
                    </div>
                </div>
            </form>

            {/* Navigation buttons */}
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

export default SelectPlanForm;