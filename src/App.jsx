import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Menu from "./Menu";
import DishDetails from "./DishDetails";
import Checkout from "./Checkout";
import SignIn from "./SignIn";
import RequireAuth from "./RequireAuth";

import "./App.css";

function Home() {
  return (
    <div>
      <h2>Welcome to Addis Eats</h2>
      <p>Ethiopian Food • Addis Ababa</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="menu" element={<Menu />} />

        <Route path="menu/:id" element={<DishDetails />} />

        <Route path="signin" element={<SignIn />} />

        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;