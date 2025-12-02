const imagekit = require("../config/imagekit.config");

// Upload single image to ImageKit
async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: fileName,
      folder: "/citysettel/listings",
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      data: {
        url: result.url,
        fileId: result.fileId,
        thumbnailUrl: result.thumbnailUrl,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
}

// Upload multiple images to ImageKit
async function uploadMultipleImages(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(async (file) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      const result = await imagekit.upload({
        file: file.buffer,
        fileName: fileName,
        folder: "/citysettel/listings",
      });

      return {
        url: result.url,
        fileId: result.fileId,
        thumbnailUrl: result.thumbnailUrl,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return res.status(200).json({
      message: "Images uploaded successfully",
      data: uploadedImages,
    });
  } catch (error) {
    console.error("Multiple image upload error:", error);
    return res.status(500).json({
      message: "Failed to upload images",
      error: error.message,
    });
  }
}

// Delete image from ImageKit
async function deleteImage(req, res) {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ message: "File ID is required" });
    }

    await imagekit.deleteFile(fileId);

    return res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Image deletion error:", error);
    return res.status(500).json({
      message: "Failed to delete image",
      error: error.message,
    });
  }
}

// Get ImageKit authentication parameters for client-side upload
function getAuthParams(req, res) {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return res.status(200).json(authenticationParameters);
  } catch (error) {
    console.error("Auth params error:", error);
    return res.status(500).json({
      message: "Failed to get authentication parameters",
      error: error.message,
    });
  }
}

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  getAuthParams,
};
