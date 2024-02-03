import { NavBar } from "../components";
import { useAuth } from "../context/AuthContext";
function Home() {
  const { logoutUser } = useAuth();
  const handleLogout = async () => {
    try {
      await logoutUser();
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
