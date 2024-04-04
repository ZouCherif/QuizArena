import { Outlet } from "react-router-dom";
import { NavBar } from ".";

function SharedLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default SharedLayout;
