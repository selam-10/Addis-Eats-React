import Menu from "./Menu";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <Menu />
      </main>
    </div>
  );
}

export default App;