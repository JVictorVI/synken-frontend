import axios from "axios";

const API_IMG_KEY = "57f0e309c23bfc3ab196ab8d8d5c5056";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_IMG_KEY}`,
      formData
    );
    return response.data.data.url;
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
  }
};

export const registerUser = async (email, name, username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/register", {
      email,
      name,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};
