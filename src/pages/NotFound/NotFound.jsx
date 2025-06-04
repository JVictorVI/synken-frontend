import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { TbError404Off } from "react-icons/tb";

function NotFound() {
  return (
    <div className="404Error">
      <title>Página não encontrada | Synken </title>
      <div className={styles.errorContainer}>
        <TbError404Off size={150} color="#7f5af0" />
        <h1>Página não encontrada</h1>
        <p>O conteúdo desta página não foi encontrado ou não existe</p>
        <Link to="/">
          <button>Voltar ao início</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
