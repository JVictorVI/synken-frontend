import styles from "./Profile.module.css";

import { useParams } from "react-router-dom";
import Navebar from "../../components/Navebar/Navebar";
import { getUser } from "../Home/HomeService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import default_pfp from "../../assets/undefined_pfp.png";
import { formatDateString } from "../../Service/GeneralService";

function Profile() {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const { username } = useParams();

  // Se houver um usuário na sessão e ele estiver acessando seu próprio perfil, define isCurrentUser como true
  const isCurrentUser = sessionUser && sessionUser.username === username;

  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      if (isCurrentUser) {
        setProfile(sessionUser);
      } else {
        try {
          const data = await getUser(username);
          setProfile(data);
        } catch (error) {
          toast.error("Usuário não encontrado: ", error);
        }
      }
    }
    fetchProfile();
  }, [isCurrentUser, username]);

  return (
    <div className={styles.profile}>
      <Navebar />
      <div className={styles.profileHeader}>
        <div className={styles.container}>
          <img
            src={profile.profilePicture || default_pfp}
            alt={profile.username}
          />

          <div className={styles.userInfo}>
            <p>{profile.username}</p>
            <span> Membro desde {formatDateString(profile.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className={styles.profileStatus}>
        <div className={styles.container}>
          <div className={styles.status}>
            <p>Posts</p>
            <span>{profile.posts ? profile.posts.length : 20}</span>
          </div>

          <div className={styles.status}>
            <p>Seguidores</p>
            <span>{profile.posts ? profile.posts.length : 20}</span>
          </div>

          <div className={styles.status}>
            <p>Seguindo</p>
            <span>{profile.posts ? profile.posts.length : 20}</span>
          </div>
        </div>
      </div>
      <div className={styles.profileActions}>
        <div className={styles.container}>
          {isCurrentUser ? (
            <button
              onClick={() => {
                window.location.href = "/profile/edit";
              }}
            >
              Editar perfil
            </button>
          ) : null}

          {!isCurrentUser ? (
            <>
              <button>Seguir</button>
              <button className={styles.sendMessageButton}>
                Enviar mensagem
              </button>
            </>
          ) : null}
        </div>
      </div>
      {isCurrentUser ? "Seu perfil" : "Perfil de " + profile.username}{" "}
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </div>
  );
}

export default Profile;
