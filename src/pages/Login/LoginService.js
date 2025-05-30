import api from "../../components/api/api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar login", error);
    throw error;
  }
};
