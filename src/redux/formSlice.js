import { createSlice } from '@reduxjs/toolkit';

// Initial state for the form
const initialState = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
    },
    selectedPlan: {
        id: 'arcade',
        name: 'Arcade',
        price: 9,
    },
    billingCycle: 'monthly', // Default billing cycle
    addOns: [], // Selected add-ons
    activeStep: 1, // Current step in the form
};

// Create a slice for the form
const formSlice = createSlice({
    name: 'form', // Name of the slice
    initialState, // Initial state
    reducers: {
        // Update personal information
        updatePersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        },

        // Select a plan and adjust price based on billing cycle
        selectPlan: (state, action) => {
            state.selectedPlan = {
                ...action.payload,
                price: state.billingCycle === 'yearly' ? action.payload.price * 10 : action.payload.price,
            };
        },

        // Toggle billing cycle (monthly/yearly) and adjust prices
        toggleBillingCycle: (state) => {
            const isYearly = state.billingCycle === 'monthly';
            state.billingCycle = isYearly ? 'yearly' : 'monthly';

            // Adjust selected plan price
            state.selectedPlan.price = isYearly
                ? state.selectedPlan.price * 10
                : state.selectedPlan.price / 10;

            // Adjust add-ons prices
            state.addOns = state.addOns.map((addOn) => ({
                ...addOn,
                price: isYearly ? addOn.price * 10 : addOn.price / 10,
            }));
        },

        // Toggle add-ons (add/remove)
        toggleAddOn: (state, action) => {
            const addOn = action.payload;
            const isAddOnSelected = state.addOns.some((item) => item.id === addOn.id);

            if (isAddOnSelected) {
                // Remove add-on if already selected
                state.addOns = state.addOns.filter((item) => item.id !== addOn.id);
            } else {
                // Add add-on if not selected
                state.addOns.push({
                    ...addOn,
                    price: state.billingCycle === 'yearly' ? addOn.price * 10 : addOn.price,
                });
            }
        },

        // Update active step in the form (increment/decrement)
        updateActiveStep: (state, action) => {
            if (action.payload === 'increment') {
                state.activeStep = Math.min(state.activeStep + 1, 4); // Move to next step
            } else if (action.payload === 'decrement') {
                state.activeStep = Math.max(state.activeStep - 1, 1); // Move to previous step
            }
        },
    },
});

// Export actions
export const {
    updatePersonalInfo,
    selectPlan,
    toggleBillingCycle,
    toggleAddOn,
    updateActiveStep,
} = formSlice.actions;

// Export reducer
export default formSlice.reducer;