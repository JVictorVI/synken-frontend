import { uploadImage } from "../../pages/Register/RegisterService";
import api from "../../components/api/api.js";

export const createPost = async (postContent, postImage, username) => {
  let imgURL = postImage ? await uploadImage(postImage) : null;

  try {
    const response = await api.post("http://localhost:8080/post/new", {
      username: username,
      content: postContent,
      imgPost: imgURL,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};
