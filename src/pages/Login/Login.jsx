import styles from "./Login.module.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdLockReset } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { loginUser } from "./LoginService";
import { useState } from "react";

import Loader from "../../components/Loader/Loader";

import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    try {
      let data = await loginUser(email, password);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      toast.error("Erro: " + error.response.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="login">
      <title> Login | Synken </title>

      <div className={styles.login}>
        <div className={styles.container}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <h2>Acesse sua conta</h2>
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <div className={styles.forgotPassword}>
                  <MdLockReset size={15} color="#7f5af0" />
                  <a href="/forgot-password">Esqueceu sua senha?</a>{" "}
                </div>

                <button className={styles.loginButton} type="submit">
                  Entrar
                </button>
              </form>
              <hr />
              <div className={styles.registerContainer}>
                <MdPersonAddAlt1 size={20} color="#7f5af0" />
                <a href="/sign-up">
                  <span> Não possui uma conta? </span> Criar conta
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer autoClose={3000} position="bottom-left" theme="dark" />
    </div>
  );
}

export default Login;
