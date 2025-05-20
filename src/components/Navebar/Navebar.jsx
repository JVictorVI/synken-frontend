import styles from "./Navebar.module.css";

import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineManageSearch } from "react-icons/md";

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoChatbubbles } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Navebar() {
  const selectedColor = "#871622CC";
  const unselectedColor = "#000000";

  const location = useLocation();

  const sessionUser = JSON.parse(sessionStorage.getItem("user")) || {};

  const [selectedTab, setSelectedTab] = "home";

  // Determina a tab selecionada com base na rota atual
  const getSelectedTab = () => {
    if (location.pathname.startsWith("/")) return;
    if (location.pathname.startsWith("/search")) return "search";
    if (location.pathname.startsWith("/chat")) return "chat";
    if (location.pathname.startsWith("/profile")) return "profile";
    return "home";
  };

  useEffect(() => {
    const handleTabChange = () => {};

    handleTabChange();
  });

  console.log("Selected Tab:", selectedTab);

  return (
    <div className="NaveBar">
      <div className={styles.logoContainer}>
        <h1>SYNKEN</h1>
      </div>
      <div className={styles.navebar}>
        <Link to="/">
          <button>
            <IoHomeSharp
              className={styles.icon}
              color={selectedTab === "home" ? selectedColor : unselectedColor}
              size={30}
            />
          </button>
        </Link>

        <Link to="/search">
          <button>
            <MdOutlineManageSearch
              className={styles.icon}
              color={selectedTab === "search" ? selectedColor : unselectedColor}
              size={30}
            />
          </button>
        </Link>

        <Link to="/chat">
          <button>
            <IoChatbubbles
              className={styles.icon}
              color={selectedTab === "chat" ? selectedColor : unselectedColor}
              size={30}
            />
          </button>
        </Link>
        <Link to={`/profile/${sessionUser.username}`}>
          <button>
            <MdOutlineAccountCircle
              className={styles.icon}
              color={
                selectedTab === "profile" ? selectedColor : unselectedColor
              }
              size={30}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navebar;
