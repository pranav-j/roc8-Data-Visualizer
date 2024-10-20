import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import("./config/dbConfig.js")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({ origin: 'http://127.0.0.1:5174', credentials: true }));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server started on...........", process.env.PORT);
});