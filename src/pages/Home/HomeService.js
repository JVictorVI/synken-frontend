import api from "../../components/api/api.js";

export const getUser = async (username) => {
  try {
    const response = await api.get(
      "http://localhost:8080/user/username/" + username
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};
