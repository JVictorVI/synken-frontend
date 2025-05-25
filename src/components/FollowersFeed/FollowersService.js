import api from "../api/api.js";

export const getAllUsers = async () => {
  try {
    const response = await api.get("http://localhost:8080/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
