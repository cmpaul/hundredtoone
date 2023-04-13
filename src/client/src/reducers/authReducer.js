// src/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Handle actions related to authentication, e.g., setting the user data and token
    default:
      return state;
  }
};
