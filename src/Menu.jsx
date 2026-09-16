import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";
import useCartStore from "./store/cartStore";
import { loadDishes } from "./api";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "Main";

  const [category, setCategory] = useState(categoryFromUrl);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  const items = useCartStore((state) => state.items);

  const categories = [
    "Main",
    "Side",
    "Drink",
    "Dessert",
  ];

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      try {
        setLoading(true);
        setError("");

        const data = await loadDishes(controller.signal);

        setDishes(
          data.filter(
            (dish) => dish.category === category
          )
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  const total = items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  const searchedDishes = dishes.filter((dish) =>
    dish.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading dishes...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div>
      <CategoryBar
        categories={categories}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
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

      <DishList dishes={searchedDishes} />

      <div className="order-total">
        <h2>Order Total: {total} ETB</h2>
      </div>

      <DeliveryForm />
    </div>
  );
}

export default Menu;