import "./../../styles/authForm.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/header";


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/signup`, {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="auth-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p onClick={() => navigate('/login')} className="toggle-link">
                    Already have an account? Login
                </p>
            </div>
        </>
    );
}

export default Signup;
