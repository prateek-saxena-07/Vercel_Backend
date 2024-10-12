import express from "express";
import {Register,SignIn} from "../controller/auth.controller.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', SignIn);

export default router;