import styles from "./Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import { IoEnterOutline } from "react-icons/io5";
import { useState } from "react";
import { registerUser } from "./RegisterService";

import Loader from "../../components/Loader/Loader";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !username || !password) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser(email, name, username, password);
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    } catch (error) {
      toast.error("Erro: " + error.response.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="register">
      <title> Cadastro | Synken </title>

      <div className={styles.register}>
        <div className={styles.container}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <h2>Cadastre-se para interagir com seus amigos!</h2>
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label>Nome de usuário</label>
                <input
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  onChange={(e) => {
                    setUsername(e.target.value);
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
                <button className={styles.registerButton} type="submit">
                  Cadastrar-se
                </button>
              </form>
              <hr />
              <div className={styles.loginContainer}>
                <IoEnterOutline size={20} color="7f5af0" />
                <a href="/sign-in">
                  <span> Já possui uma conta? </span> Entrar
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

export default Register;
