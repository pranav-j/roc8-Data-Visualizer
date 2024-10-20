import mongoose from "mongoose";

const dbURI = process.env.dbURI;


mongoose.connect(dbURI)
    .then(() => {
        console.log('MongoDB connected...............');
    })
    .catch(err => console.error('MongoDB connection error...............:', err));

