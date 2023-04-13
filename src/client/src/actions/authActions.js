// src/actions/authActions.js
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    await axios.post('/auth/register', userData);
    // Perform any necessary actions after a successful registration
  } catch (error) {
    // Handle errors, e.g., dispatch an action to display an error message
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/auth/login', userData);
    // Save the received token and user data to the Redux state
    // You could also store the token in localStorage or a cookie
  } catch (error) {
    // Handle errors, e.g., dispatch an action to display an error message
  }
};
