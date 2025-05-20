import { uploadImage } from "../../pages/Register/RegisterService";
import api from "../../components/api/api.js";

export const createPost = async (postContent, postImage, userID) => {
  let imgURL = await uploadImage(postImage);

  try {
    const response = await api.post("http://localhost:8080/post/new", {
      idUser: userID,
      content: postContent,
      imgPost: imgURL,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};
