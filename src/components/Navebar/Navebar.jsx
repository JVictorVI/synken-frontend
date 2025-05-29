import styles from "./Navebar.module.css";

import { IoHomeSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaUserFriends } from "react-icons/fa";

function Navebar() {
  const selectedColor = "#7f5af0";
  const unselectedColor = "#242629";

  const location = useLocation();

  const sessionUser = JSON.parse(sessionStorage.getItem("user")) || {};

  const [selectedTab, setSelectedTab] = useState([]);

  // Determina a tab selecionada com base na rota atual
  const getSelectedTab = () => {
    if (location.pathname.endsWith("/")) return "home";
    if (location.pathname.includes("/chat")) return "chats";
    if (location.pathname.includes("/profile")) return "profile";
    if (location.pathname.includes("/logout")) return "logout";
    //if (location.pathname.endsWith("/chat")) return "chat";
    //if (location.pathname.endsWith("/profile/" + sessionUser.username))
    //return "profile";
    return "home";
  };

  useEffect(() => {
    const handleTabChange = () => {
      const currentTab = getSelectedTab();
      setSelectedTab(currentTab);
    };

    handleTabChange();
  }, [location.pathname, sessionUser.username]);

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

        <Link to="/chats">
          <button>
            <FaUserFriends
              className={styles.icon}
              color={selectedTab === "chats" ? selectedColor : unselectedColor}
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

        <Link to="#">
          <button>
            <MdLogout
              className={styles.icon}
              color={selectedTab === "logout" ? selectedColor : unselectedColor}
              size={30}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navebar;
