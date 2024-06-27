import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      if (response.data.success) {
      
       navigate('/navbar');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div class="content">
        <div class="text">
          <img className="logo" src='../assets/logo.png' alt="Logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div class="field">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <span class="fas fa-user"></span>
            <label>Email or Phone</label>
          </div>
          <div class="field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span class="fas fa-lock"></span>
            <label>Password</label>
          </div>
          <div class="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
