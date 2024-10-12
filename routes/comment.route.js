import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controller/comment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
