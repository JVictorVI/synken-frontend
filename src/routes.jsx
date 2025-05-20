import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";

function AppRoutes() {
  // Componente/Layout para rotas protegidas
  const ProtectedLayout = () => {
    // Obtém os dados diretamente do sessionStorage
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
          <Route path="/chat" element={<Chat />} />
        </Route>

        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
