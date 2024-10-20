// import "./../../styles/authForm.css";
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../redux/slices/userSlice';
// import Header from "../../components/header";

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogin = (event) => {
//         event.preventDefault();

//         dispatch(loginUser({ email, password }))
//             .then((response) => {
//                 if (response.meta.requestStatus === 'fulfilled') {
//                     navigate('/dashboard');
//                 } else {
//                     alert('Login failed. Please check your credentials.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Login error:', error);
//                 alert('Login failed. Please try again.');
//             });
//     };

//     return (
//         <>
//             <Header />
//             <div className="auth-form">           
//                 <h2>Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Login</button>
//                 </form>
//                 <p onClick={() => navigate('/signup')} className="toggle-link">
//                     Don't have an account? Sign Up
//                 </p>
//             </div>
//         </>
//     );
// }

// export default Login;


import "./../../styles/authForm.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/userSlice';
import Header from "../../components/header";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading status
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoading(true); // Set loading to true when login starts

        dispatch(loginUser({ email, password }))
            .then((response) => {
                setIsLoading(false); // Set loading to false after login completes
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/dashboard');
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                setIsLoading(false); // Set loading to false in case of an error
                alert('Login failed. Please try again.');
            });
    };

    return (
        <>
            <Header />
            <div className="auth-form">           
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    {isLoading && <p className="loading-message">Logging you in...</p>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading} // Disable input while loading
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
                            disabled={isLoading} // Disable input while loading
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
                        {isLoading ? 'Please wait...' : 'Login'}
                    </button>
                </form>
                <p onClick={() => navigate('/signup')} className="toggle-link">
                    Don't have an account? Sign Up
                </p>
            </div>
        </>
    );
}

export default Login;
