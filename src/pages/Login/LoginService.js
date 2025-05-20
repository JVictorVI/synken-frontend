import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar login", error);
    throw error;
  }
};
