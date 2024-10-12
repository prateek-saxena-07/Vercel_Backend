import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Video from './routes/addVideo.route.js'
import comment from './routes/comment.route.js'

dotenv.config();
const PORT = process.env.PORT || 5100;
const app = new express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173',credentials: true }));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/temp', Video);
app.use('/api/v1/comments',comment)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something Went Wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
    connectDB();
});