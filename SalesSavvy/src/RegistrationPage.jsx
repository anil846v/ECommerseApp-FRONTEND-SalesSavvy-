import React, { useState } from 'react';
import './assets/styles.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('http://localhost:9090/api/users/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });
      
      const data = await response.json();

      if (response.ok) {
        console.log('Response Data:', data);
        if (data.user.role === "CUSTOMER") {
          console.log("Navigating to customer home");
          navigate("/");
        } else if (data.user.role === "ADMIN") {
          console.log("Navigating to admin home");
          navigate("/admin");
        } else {
          console.log("Unknown role:", data.role);
        }
      } else {
        throw new Error(data.error || 'Registration failed');
      }
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">Register</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp} className="form-content">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-select"
            >
              <option value="" disabled>Select your role</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option> {/* Added Admin Option */}
            </select>
          </div>
          <button type="submit" className="form-button">Sign Up</button>
        </form>
        <p className="form-footer">
          Already a user?{' '}
          <Link to="/" className="form-link">Log in here</Link>  or Admin?
          <Link to="/admin" className="form-link"> Log in here</Link>
        </p>
       
      </div>
    </div>
  );
}
