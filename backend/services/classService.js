import axios from "axios";

export const classService = {
  getAll: async () => {
    return await axios.get("/api/classes");
  },

  create: async (data) => {
    return await axios.post("/api/classes", data);
  },

  update: async (id, data) => {
    return await axios.put(`/api/classes/${id}`, data);
  },

  delete: async (id) => {
    return await axios.delete(`/api/classes/${id}`);
  }
};