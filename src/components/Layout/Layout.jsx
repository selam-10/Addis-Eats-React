import { Link, Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout() {
  return (
    <>
      <Header />

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;