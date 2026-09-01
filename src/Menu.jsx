import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";
import { loadDishes } from "./api";

function Menu() {
  const [category, setCategory] = useState("Main");
  const [dishes, setDishes] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  const categories = ["Main", "Side", "Drink", "Dessert"];

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      try {
        setLoading(true);
        setError("");

        const data = await loadDishes(controller.signal);

        setDishes(
          data.filter((dish) => dish.category === category)
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  // Automatically focus the search input when Menu loads
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleAdd = (dish) => {
    setOrder([...order, dish]);
  };

  const total = order.reduce((sum, dish) => sum + dish.price, 0);

  // Filter dishes based on search text
  const searchedDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (loading) {
    return <p>Loading dishes...</p>;
  }

  // Error state
  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div>
      <CategoryBar
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <div className="search-container">
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes..."
          className="search-input"
        />
      </div>

      <DishList
        dishes={searchedDishes}
        onAdd={handleAdd}
      />

      <div className="order-total">
        <h2>Order Total: {total} ETB</h2>
      </div>

      <DeliveryForm />
    </div>
  );
}

export default Menu;