import { NavBar } from "../components";
import { logout } from "../utils/api";
import { useAuth } from "../context/AuthContext";
function Home() {
  const { setToken } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      setToken(null);
      document.cookie = `infoToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    } catch (e) {}
  };
  return (
    <div>
      <NavBar />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
