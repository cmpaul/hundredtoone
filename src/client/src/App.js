// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hundredto.one</h1>
        <LoginForm />
        <RegisterForm />
      </div>
    </Provider>
  );
}

export default App;
