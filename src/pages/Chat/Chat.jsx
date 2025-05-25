import Navebar from "../../components/Navebar/Navebar";
import styles from "./Chat.module.css";

function Chat() {
  return (
    <div className={styles.chat}>
      <Navebar />
      <h1>Chat</h1>
    </div>
  );
}

export default Chat;
