import api from "../../components/api/api.js";
import { uploadImage } from "../../Service/GeneralService.js";

export const updateUser = async (
  currentUsername,
  name,
  username,
  email,
  createdAt,
  profileImage
) => {
  let imgURL = profileImage ? await uploadImage(profileImage) : profileImage;

  try {
    const response = await api.put("/user/update/" + currentUsername, {
      name: name,
      username: username,
      email: email,
      createdAt: createdAt,
      profilePicture: imgURL,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};
