import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Search from "./pages/Friends/Friends";
import PublicChat from "./pages/PublicChat/PublicChat";
import PrivateChat from "./pages/PrivateChat/PrivateChat";
import Friends from "./pages/Friends/Friends";
function AppRoutes() {
  const ProtectedLayout = () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (!user || !token) {
      return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:username" element={<PrivateChat />} />
          <Route path="/chats" element={<Friends />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Route>

        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
