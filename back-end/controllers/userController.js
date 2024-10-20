import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists. Please log in.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully. Please log in.' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("No user found.............");           
            return res.status(404).json({ message: 'User not found. Please sign up.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Password invalid.............");           
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ email: user.email, username: user.username, _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 43200000,
        });
        console.log("Login succesfull.............");
        
        return res.status(200).json({ message: 'Login successful', user: { email: user.email, username: user.username } });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
