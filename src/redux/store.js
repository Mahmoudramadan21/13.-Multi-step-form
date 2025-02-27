import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

// Create Redux store with form slice
const store = configureStore({
    reducer: {
        form: formReducer, // Form slice reducer
    },
});

export default store;