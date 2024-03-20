import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";

export function Root() {

  return (
    <>
      <main className="container">
        <Menu />
        <Outlet />
      </main>
    </>
  );
}
