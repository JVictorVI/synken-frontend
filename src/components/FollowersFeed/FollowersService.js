import api from "../api/api.js";

export const getAllUsers = async (loggedUsername) => {
  try {
    const response = await api.get("http://localhost:8080/users");

    const filteredUsers = response.data.filter(
      (user) => user.username !== loggedUsername
    );
    return filteredUsers;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};
