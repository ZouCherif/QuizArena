import { NavBar, SessionCode } from "../components";
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
      <main className="max-w-[1500px] mx-auto">
        <SessionCode />
      </main>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
