import React, { useState } from 'react';
import '../styles/login.css'; // You'll need to create this CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', email, password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Login with Google');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Login with Facebook');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="social-login">
        <button onClick={handleGoogleLogin} className="google-button">
          Login with Google
        </button>
        <button onClick={handleFacebookLogin} className="facebook-button">
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;