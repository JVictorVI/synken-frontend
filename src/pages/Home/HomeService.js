import api from "../../components/api/api.js";

export const getUser = async (username) => {
  try {
    const response = await api.get("/user/username/" + username);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};
