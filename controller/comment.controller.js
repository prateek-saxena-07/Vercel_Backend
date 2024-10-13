import { createError } from "../error.js";
import Comment from "../model/comment.model.js";
import Video from "../model/video.model.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://vercel-frontend-xi-coral.vercel.app"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    // Find the comment by ID
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return next(createError(404, "Comment not found!"));
    }

    // Find the associated video by videoId in the comment
    const video = await Video.findById(comment.videoId);
    if (!video) {
      return next(createError(404, "Video not found!"));
    }

    // Check if the logged-in user is either the commenter or the video uploader
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      // Delete the comment
      await Comment.findByIdAndDelete(req.params.id);
        res.setHeader(
          "Access-Control-Allow-Origin",
          "https://vercel-frontend-xi-coral.vercel.app"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
