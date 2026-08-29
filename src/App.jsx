import Menu from "./Menu";
import Header from "./components/Header/Header";
import menu from "./Data";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <Menu dishes={menu} />
      </main>
    </div>
  );
}

export default App;
