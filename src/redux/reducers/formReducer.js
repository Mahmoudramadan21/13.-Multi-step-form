// import { selectPlan } from '../actions/formActions';
// import {
//     UPDATE_PERSONAL_INFO,
//     SELECT_PLAN,
//     TOGGLE_BILLING_CYCLE,
//     TOGGLE_ADD_ON,
//     UPDATE_ACTIVE_STEP,
// } from '../constants';

// // Initial state for the form
// const initialState = {
//     personalInfo: {
//         name: '',
//         email: '',
//         phone: '',
//     },
//     selectedPlan: {
//         id: 'arcade',
//         name: 'Arcade',
//         price: 9,
//     },
//     billingCycle: 'monthly',
//     addOns: [],
//     activeStep: 1,
// };

// // Form reducer to handle actions
// const formReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_PERSONAL_INFO:
//             return {
//                 ...state,
//                 personalInfo: action.payload,
//             };

//         case SELECT_PLAN:
//             return {
//                 ...state,
//                 selectedPlan: {
//                     ...action.payload,
//                     price: state.billingCycle === 'yearly' ? action.payload.price * 10 : action.payload.price
//                 }
//             };

//         case TOGGLE_BILLING_CYCLE:
//             const isYearly = state.billingCycle === 'monthly';
//             return {
//                 ...state,
//                 billingCycle: isYearly ? 'yearly' : 'monthly',
//                 selectedPlan: {
//                     ...state.selectedPlan,
//                     price: isYearly ? state.selectedPlan.price * 10 : state.selectedPlan.price / 10
//                 },
//                 addOns: state.addOns.map(addOn => ({ ...addOn, price: isYearly ? addOn.price * 10 : addOn.price / 10 }))
//             };


//         case TOGGLE_ADD_ON:
//             const addOn = action.payload;
//             const isAddOnSelected = state.addOns.some((item) => item.id === addOn.id);

//             return {
//                 ...state,
//                 addOns: isAddOnSelected
//                     ? state.addOns.filter((item) => item.id !== addOn.id)
//                     : [...state.addOns, { ...addOn, price: state.billingCycle === "yearly" ? addOn.price * 10 : addOn.price }],
//             };

//         case UPDATE_ACTIVE_STEP:
//             return {
//                 ...state,
//                 activeStep: action.payload === 'increment'
//                     ? Math.min(state.activeStep + 1, 4)
//                     : Math.max(state.activeStep - 1, 1),
//             };

//         default:
//             return state;
//     }
// };

// export default formReducer;