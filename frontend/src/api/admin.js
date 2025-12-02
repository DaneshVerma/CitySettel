import api from "./axios";

export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  // Listings management
  getAllListings: async (params) => {
    const response = await api.get("/admin/listings", { params });
    return response.data;
  },

  getPendingListings: async (params) => {
    const response = await api.get("/admin/listings/pending", { params });
    return response.data;
  },

  approveListing: async (listingId) => {
    const response = await api.put(`/admin/listings/${listingId}/approve`);
    return response.data;
  },

  rejectListing: async (listingId, reason) => {
    const response = await api.put(`/admin/listings/${listingId}/reject`, {
      reason,
    });
    return response.data;
  },

  // Vendors management
  getAllVendors: async (params) => {
    const response = await api.get("/admin/vendors", { params });
    return response.data;
  },

  verifyVendor: async (vendorId) => {
    const response = await api.put(`/admin/vendors/${vendorId}/verify`);
    return response.data;
  },

  rejectVendor: async (vendorId) => {
    const response = await api.put(`/admin/vendors/${vendorId}/reject`);
    return response.data;
  },
};
