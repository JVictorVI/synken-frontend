import { uploadImage } from "../../pages/Register/RegisterService";
import api from "../../components/api/api.js";

export const updateUser = async (
  name,
  username,
  email,
  createdAt,
  profileImage
) => {
  let imgURL = profileImage ? await uploadImage(profileImage) : profileImage;

  try {
    const response = await api.put(
      "http://localhost:8080/user/update/" + username,
      {
        name: name,
        username: username,
        email: email,
        createdAt: createdAt,
        profilePicture: imgURL,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};
