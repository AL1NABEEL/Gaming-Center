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
      <div>
      <div className="login-form-container">
      <h1>Game Center</h1>
        <h2>Let's Login with our Game Center Account First</h2>
        <form onSubmit={handleSubmit}>
        

<div>
  <button>Google</button>
</div>


          <div className="form-input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={handleEmailChange} value={email} required />
          </div>
  




          <div className="form-input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={handlePasswordChange} value={password} required  />
        
          </div>
          
  <input type='checkbox'/>
  <p> forget password</p>




          <button type="submit">Login</button>
        </form>
      </div>

<h4 >Don't have an account ?<u>Register</u> </h4>


      </div>
    );
  }
  
  export default LoginForm;