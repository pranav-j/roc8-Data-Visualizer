import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("No token found.............");        
        return res.status(401).json({ message: 'Authentication required. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up or log in again.' });
        }

        req.user = user;
        console.log("Token found.............");
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};

export default authenticateUser;
