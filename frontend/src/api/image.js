import api from "./axios";

export const imageAPI = {
  // Get ImageKit auth parameters
  getAuthParams: async () => {
    const response = await api.get("/images/auth");
    return response.data;
  },

  // Upload single image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Upload multiple images
  uploadMultipleImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await api.post("/images/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete image
  deleteImage: async (fileId) => {
    const response = await api.delete(`/images/${fileId}`);
    return response.data;
  },
};
