import api from "./axios";

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/user/profile", profileData);
    return response.data;
  },

  // Get saved listings
  getSavedListings: async () => {
    const response = await api.get("/user/saved");
    return response.data;
  },

  // Save listing
  saveListing: async (listingId) => {
    const response = await api.post("/user/saved", { listingId });
    return response.data;
  },

  // Unsave listing
  unsaveListing: async (listingId) => {
    const response = await api.delete(`/user/saved/${listingId}`);
    return response.data;
  },
};

export default userAPI;
