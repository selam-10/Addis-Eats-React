import { useState } from "react";
import Menu from "./Menu";
import Header from "./components/Header/Header";
import menu from "./Data";
import "./App.css";

function App() {
  const [category, setCategory] = useState("Main");

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="category-buttons">
          <button onClick={() => setCategory("Main")}>
            Main
          </button>

          <button onClick={() => setCategory("Side")}>
            Side
          </button>

          <button onClick={() => setCategory("Drink")}>
            Drink
          </button>

          <button onClick={() => setCategory("Dessert")}>
            Dessert
          </button>
        </div>

        <Menu dishes={menu} category={category} />
      </main>
    </div>
  );
}

export default App;