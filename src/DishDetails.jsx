import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadDishes } from "./api";

function DishDetails() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDish() {
      try {
        setLoading(true);
        setError("");

        const dishes = await loadDishes(controller.signal);

        const foundDish = dishes.find(
          (item) => String(item.id) === id
        );

        if (!foundDish) {
          throw new Error("Dish not found.");
        }

        setDish(foundDish);
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

    fetchDish();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">Error: {error}</p>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-details">
      <h2>{dish.name}</h2>

      <p>
        Price: {dish.price} ETB
      </p>

      {dish.spicy === true && (
        <span className="spicy-badge">Spicy</span>
      )}

      <br />

      <Link to="/menu">← Back to Menu</Link>
    </div>
  );
}

export default DishDetails;