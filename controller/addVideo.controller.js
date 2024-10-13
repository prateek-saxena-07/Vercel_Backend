import Video from '../model/video.model.js'
import { createError } from '../error.js';

// export const addVideo=async (req, res) => {
//     const { title, videoUrl,channel,thumbnail,likes,disLikes,comments,views } = req.body;
//     try {
//         const newVid = await Video.create({
//             title: title,
//             videoUrl: videoUrl,
//             channel: channel,
//             thumbnail: thumbnail,
//             views: views,
//             likes: likes,
//             disLikes: disLikes,
//             comments:comments
//         });
//         res.status(201).json(newVid)
//     }
//     catch (err)
//     {   console.log(err)
//         res.status(500).json({ message: "Error creating video" ,err:err});
//     }
    
// }

export const getVideos = async (req, res) => {
    try {
        const vid = await Video.find({});
        res.status(200).json({ success:true,data: vid });
    }

    catch (err) {   
        console.log(err);
        res.status(500).json({success:false, message:'Server Error :)',err:err.message})
    }

}
// =================================
export const addVideos = async (req, res, next) => {
   const newVideo = new Video({ userId: req.user.id, ...req.body });
   try {
     const savedVideo = await newVideo.save();
     res.status(200).json(savedVideo);
   } catch (err) {
     next(err);
   }
}



export const updateVideos = async (req, res, next) => {try {
  const video = await Video.findById(req.params.id);
  if (!video) return next(createError(404, "Video not found!"));
  if (req.user.id === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const userVideos = await Video.find({ userId: req.user.id });
    res
      .status(200)
      .json({ message: "The video has been Updated.", data: userVideos });
  } else {
    return next(createError(403, "You can update only your video!"));
  }
} catch (err) {
  next(err);
  }
};

export const deleteVideos = async (req, res, next) => { 
 try {
   const video = await Video.findById(req.params.id);
   if (!video) return next(createError(404, "Video not found!"));
   if (req.user.id === video.userId) {
     await Video.findByIdAndDelete(req.params.id);
     const userVideos = await Video.find({ userId: req.user.id });
     res.status(200).json({message:"The video has been deleted.", data: userVideos});
   } else {
     return next(createError(403, "You can delete only your video!"));
   }
 } catch (err) {
   next(err);
 }
};
 export const getVideo = async (req, res, next) => { try {
   const video = await Video.findById(req.params.id);
   res.status(200).json(video);
 } catch (err) {
   next(err);
     }
 };

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};