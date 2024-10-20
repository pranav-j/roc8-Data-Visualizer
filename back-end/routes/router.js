import express from "express";
import { getSheetData } from "../controllers/dataController.js";
import { signup, login } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Seems like it's working.")
});

router.get("/api/data", authenticateUser, getSheetData);
router.post("/api/signup", signup);
router.post("/api/login", login);

export default router;