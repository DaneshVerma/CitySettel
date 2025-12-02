import api from "./axios";

export const comboAPI = {
  // Get all combos with filters
  getCombos: async (params = {}) => {
    const response = await api.get("/combos", { params });
    return response.data;
  },

  // Get single combo
  getCombo: async (id) => {
    const response = await api.get(`/combos/${id}`);
    return response.data;
  },

  // Create combo
  createCombo: async (comboData) => {
    const response = await api.post("/combos", comboData);
    return response.data;
  },

  // Update combo
  updateCombo: async (id, comboData) => {
    const response = await api.put(`/combos/${id}`, comboData);
    return response.data;
  },

  // Delete combo
  deleteCombo: async (id) => {
    const response = await api.delete(`/combos/${id}`);
    return response.data;
  },
};

export default comboAPI;
