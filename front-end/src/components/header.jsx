import "./../styles/header.css"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { persistor } from "../redux/store";

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.userDetails);
    const handleLogout = () => {
        dispatch(logoutUser());
        // persistor.purge();
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <h2>Data Visualizer</h2>
            </div>
            <div className="header-right">
                {user && (
                    <>
                        <span className="user-name">Hello, {user.username}</span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
