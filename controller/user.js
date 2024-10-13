import { createError } from "../error.js"
import User from "../model/user.model.js";
import Video from "../model/video.model.js";


export const getUser = async (req, res) => {
  
  const user = await User.findById(req.params.id);

  const { password, ...others } = user._doc;

  res.status(200).json(others);
}


export const update = async (req, res, next) => {
    //req.user.id comes from verifytoken middleware

    if (req.params.id === req.user.id)
    { 
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
          const { password, ...others } = updatedUser._doc;
            res.setHeader(
              "Access-Control-Allow-Origin",
              "https://vercel-frontend-xi-coral.vercel.app"
            );
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.status(200).json(others)
        }
        catch (err)
        {
            next(err)
            //goes to custom error handling middleware in server.js
        }
    }
    else
    {
        return next(createError(403, 'You can only update your account'));

    }
    
}

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://vercel-frontend-xi-coral.vercel.app"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://vercel-frontend-xi-coral.vercel.app"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://vercel-frontend-xi-coral.vercel.app"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json("Subscription successful.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
        res.setHeader(
          "Access-Control-Allow-Origin",
          "https://vercel-frontend-xi-coral.vercel.app"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(200).json("Unsubscription successful.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
