import { useState } from "react";
import styles from "./NewPostModal.module.css";
import { IoClose } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { createPost } from "./PostService";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";

function NewPostModal({ user, isModalOpen, setIsModalOpen, posts, setPosts }) {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postContent) {
      toast.warn("Preencha o conteúdo do post.");
      return;
    }

    setIsLoading(true);

    const createdPost = await createPost(postContent, imageFile, user.username);

    if (createdPost) {
      toast.success("Post criado com sucesso!");
      setPostContent("");
      setPostImage(null);
      setImageFile(null);
      setIsModalOpen(false);
      setPosts([createdPost, ...posts]);
    }

    setIsLoading(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h3> Novo post </h3>
              <div className={styles.closeIconContainer}>
                <IoClose
                  className={styles.closeIcon}
                  size={30}
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </div>
            <textarea
              rows={7}
              placeholder={`No que está pensando, ${user.name}?`}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            />

            {!postImage && (
              <div className={styles.uploadImageContainer}>
                <input
                  type="file"
                  id="upload"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPostImage(URL.createObjectURL(file));
                      setImageFile(file);
                    }
                  }}
                  hidden
                />
                <div className={styles.addPictureContainer}>
                  <MdAddPhotoAlternate size={25} />
                  <label for="upload">Adicionar imagem ao post</label>
                </div>
              </div>
            )}

            <div className={styles.imagePreviewContainer}>
              {postImage && (
                <>
                  <img
                    src={postImage}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <div className={styles.deleteImageButton}>
                    <div className={styles.closeIconContainer}>
                      <IoClose
                        className={styles.closeIcon}
                        size={25}
                        onClick={() => setPostImage(null)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={handlePost} className={styles.postButton}>
              Postar
            </button>
          </>
        )}
      </div>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </div>
  );
}

export default NewPostModal;
