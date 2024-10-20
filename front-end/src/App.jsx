import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ProtectedRoute from "./components/protectedRoute";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
