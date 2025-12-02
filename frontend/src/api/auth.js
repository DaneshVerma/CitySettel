import api from "./axios";

export const authAPI = {
  // Sign up
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Google OAuth
  googleLogin: () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  },
};

export default authAPI;
