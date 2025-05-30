import styles from "./LogoutModal.module.css";

function LogoutModal({ isModalOpen, setIsModalOpen }) {
  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3> Sair? </h3>
            </div>

            <p className={styles.text}>
              Tem certeza que deseja encerrar a sessão? Você será redirecionado
              para a página de login{" "}
            </p>
          </div>

          <div className={styles.modalButtons}>
            <button
              className={styles.leaveButton}
              onClick={() => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                window.location.href = "/sign-in";
                setIsModalOpen(false);
              }}
            >
              Sair
            </button>
            <button
              className={styles.backButton}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Voltar
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default LogoutModal;
