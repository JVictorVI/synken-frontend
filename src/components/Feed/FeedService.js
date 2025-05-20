import api from "../../components/api/api.js";

export const getPosts = async () => {
  try {
    const response = await api.get("http://localhost:8080/posts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
