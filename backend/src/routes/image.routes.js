const router = require("express").Router();
const {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  getAuthParams,
} = require("../controllers/image.controller");
const { authUser } = require("../middlewares/auth.Middleware");
const upload = require("../middlewares/upload.middleware");

// Get auth params for client-side upload
router.get("/auth", authUser, getAuthParams);

// Upload single image
router.post("/upload", authUser, upload.single("image"), uploadImage);

// Upload multiple images
router.post(
  "/upload-multiple",
  authUser,
  upload.array("images", 10),
  uploadMultipleImages
);

// Delete image
router.delete("/:fileId", authUser, deleteImage);

module.exports = router;
