import express from 'express';
import { update ,like,dislike,subscribe,unsubscribe,getUser } from '../controller/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.patch('/:id', verifyToken, update);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);


//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

router.get('/:id',getUser)

export default router