import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { supabase } from '../supabaseClient'; // Import Supabase client
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
    const { data, error } = await supabase
        .from('users') // Replace 'users' with your actual table name
        .select('*')
        .or(`username.eq.${email},email.eq.${email}`) // Check if username OR email matches
        .eq('password_hash', password)
        .single(); // Expect a single matching record

      if (error) {
        console.error('Error querying Supabase:', error);
        alert('Invalid username or password');
        return;
      }

      if (data) {
        alert('Login successful!');
        navigate('/feed'); // Redirect to the feed page
      } else {
        alert('Invalid username or password');
      }
    } 
    catch (err) {
      console.error('Unexpected error:', err);
      alert('An error occurred. Please try again.');
    }

  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
        <button type="submit">Login</button>
        <div className="forgot-password-link">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      <hr className="divider" /> {/* Horizontal bar */}

      <div className="register-link">
        <button 
          type="button" 
          style={{ backgroundColor: 'green', color: 'white', 
          padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign up
        </button>
      </div>
      
      </form>
    </div>
  );
}

export default Login;