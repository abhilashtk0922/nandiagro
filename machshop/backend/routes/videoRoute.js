import express from "express";
import videoController from "../controllers/videoController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Video routes are working" });
});

// Public routes
router.get("/all", videoController.getAllVideos);

// Protected routes
router.post(
  "/add",
  (req, res, next) => {
    console.log("Add video route hit:", req.body);
    adminAuth(req, res, next);
  },
  videoController.addVideo
);

router.put("/update/:id", adminAuth, videoController.updateVideo);
router.delete("/delete/:id", adminAuth, videoController.deleteVideo);
router.put("/toggle/:id", adminAuth, videoController.toggleVideo);
router.put("/reorder", adminAuth, videoController.reorderVideos);

export default router;
