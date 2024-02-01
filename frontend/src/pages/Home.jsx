import { NavBar } from "../components";
import { logout } from "../utils/api";
function Home() {
  const handleLogout = async () => {
    try {
      await logout();
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
