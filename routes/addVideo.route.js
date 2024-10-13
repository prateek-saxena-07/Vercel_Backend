import express from "express";
import {deleteVideos, addVideos, getVideos, updateVideos,getVideo,addView} from '../controller/addVideo.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const Video = express.Router();

// router.post('/addVideo', addVideo);
Video.get('/getVideos', getVideos);
// =============================================
// Video.post("/", verifyToken, addVideos);
Video.post("/",addVideos);  //for no auth upload
// Video.post("/", addVideos);
Video.patch('/:id',verifyToken, updateVideos);
Video.delete("/:id", verifyToken, deleteVideos);
Video.get("/find/:id", getVideo);//:id video._id
Video.put("/view/:id", addView);


export default Video;