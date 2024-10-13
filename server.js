import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

import comment from './routes/comment.route.js'
import Video from './routes/addVideo.route.js';


dotenv.config();
const PORT = process.env.PORT || 5100;
const app = new express();
connectDB();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://vercel-frontend-xi-coral.vercel.app",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//   })
// );

app.use(cors());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/temp', Video);
app.use('/comments',comment)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something Went Wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
    
});

export default app;