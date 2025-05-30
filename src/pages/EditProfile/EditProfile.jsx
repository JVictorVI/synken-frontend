import styles from "./EditProfile.module.css";
import styles2 from "../../components/NewPostModal/NewPostModal.module.css";
import Navebar from "../../components/Navebar/Navebar.jsx";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { updateUser } from "./ProfileService.js";

import Loader from "../../components/Loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const [postImage, setPostImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState(sessionUser.name);
  const [username, setUsername] = useState(sessionUser.username);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!name || !username) {
      toast.warn("Preencha todos os campos obrigatórios!");
      return;
    }

    setIsLoading(true);

    const updatedUser = await updateUser(
      sessionUser.username,
      name,
      username,
      sessionUser.email,
      sessionUser.createdAt,
      imageFile ? imageFile : sessionUser.profilePicture
    );

    if (updatedUser) {
      setIsLoading(false);
      toast.success("Perfil atualizado com sucesso!");
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <Navebar />
      <div className={styles.banner}>
        <h1>Edição de Perfil</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <form className={styles.formUpdateUser}>
              <div className={styles.field}>
                <p>Nome</p>
                <input
                  type="text"
                  name="name"
                  defaultValue={sessionUser.name}
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                ></input>{" "}
              </div>

              <div className={styles.field}>
                <p>Username</p>
                <input
                  type="text"
                  name="username"
                  defaultValue={sessionUser.username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>{" "}
              </div>

              {!postImage && (
                <div className={styles.uploadProfilePictureContainer}>
                  <div className={styles2.uploadImageContainer}>
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
                    <div className={styles2.addPictureContainer}>
                      <MdAddPhotoAlternate size={25} />
                      <label for="upload">Enviar foto de perfil</label>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.imagePreviewContainer}>
                {postImage && (
                  <>
                    <img
                      src={postImage}
                      alt="Preview"
                      className={styles2.imagePreview}
                    />
                    <div className={styles.deleteImageButton}>
                      <div className={styles2.closeIconContainer}>
                        <IoClose
                          className={styles2.closeIcon}
                          size={25}
                          onClick={() => setPostImage(null)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                className={styles.updateButton}
                onClick={handleUpdateUser}
              >
                {" "}
                Salvar{" "}
              </button>

              <button
                className={styles.backButton}
                onClick={() => {
                  navigate("/profile/" + sessionUser.username);
                }}
              >
                {" "}
                Voltar{" "}
              </button>
            </form>
          </>
        )}
      </div>
      <ToastContainer autoClose={3000} position="bottom-left" theme="dark" />
    </div>
  );
}

export default EditProfile;
