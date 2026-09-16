import { useState } from "react";
import PropTypes from "prop-types";
import useCartStore from "./store/cartStore";

function Dish({
  id,
  name,
  price,
  spicy = false,
  currency = "ETB",
}) {
  const [count, setCount] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    setCount(count + 1);

    addItem({
      id,
      name,
      price,
      spicy,
      currency,
    });
  };

  return (
    <div className="dish-card">
      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {spicy === true && (
        <span className="spicy-badge">Spicy</span>
      )}

      <div>
        <button onClick={handleAdd}>Add</button>

        <span> Added: {count}</span>
      </div>
    </div>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;