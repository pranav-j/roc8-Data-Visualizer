import "./../../styles/authForm.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/userSlice';
import Header from "../../components/header";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();

        // Dispatch the login action to Redux
        dispatch(loginUser({ email, password }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    // Redirect to dashboard after successful login
                    navigate('/dashboard');
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            });
    };

    return (
        <>
            <Header />
            <div className="auth-form">           
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
                <p onClick={() => navigate('/signup')} className="toggle-link">
                    Don't have an account? Sign Up
                </p>
            </div>
        </>
    );
}

export default Login;
