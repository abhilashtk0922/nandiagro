import videoModel from "../models/videoModel.js";

// Get all active videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error in getAllVideos:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new video
const addVideo = async (req, res) => {
  try {
    const { videoId, title, description } = req.body;

    // Validate video ID format
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid YouTube video ID" });
    }

    // Check if video already exists
    const exists = await videoModel.findOne({ videoId });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Video already exists" });
    }

    // Get the highest order number
    const lastVideo = await videoModel.findOne().sort({ order: -1 });
    const order = lastVideo ? lastVideo.order + 1 : 0;

    const video = new videoModel({
      videoId,
      title,
      description,
      order,
    });

    await video.save();
    res
      .status(201)
      .json({ success: true, message: "Video added successfully" });
  } catch (error) {
    console.error("Error in addVideo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const video = await videoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Video updated successfully" });
  } catch (error) {
    console.error("Error in updateVideo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoModel.findByIdAndDelete(id);

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error in deleteVideo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle video active status
const toggleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoModel.findById(id);

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    video.isActive = !video.isActive;
    await video.save();

    res
      .status(200)
      .json({ success: true, message: "Video status updated successfully" });
  } catch (error) {
    console.error("Error in toggleVideo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reorder videos
const reorderVideos = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order } objects

    for (const { id, order } of orders) {
      await videoModel.findByIdAndUpdate(id, { order });
    }

    res
      .status(200)
      .json({ success: true, message: "Videos reordered successfully" });
  } catch (error) {
    console.error("Error in reorderVideos:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  toggleVideo,
  reorderVideos,
};
