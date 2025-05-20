import styles from "./EditProfile.module.css";
import Navebar from "../../components/Navebar/Navebar.jsx";
function EditProfile() {
  return (
    <div className={styles.editProfileContainer}>
      <Navebar />
      <h1>Edit Profile</h1>
    </div>
  );
}

export default EditProfile;
