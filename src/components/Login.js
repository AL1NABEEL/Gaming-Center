import React, { useState } from 'react';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
    }
    return (
      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={handleEmailChange} value={email} required />
          </div>
  
          <div className="form-input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={handlePasswordChange} value={password} required />
          </div>
  
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginForm;