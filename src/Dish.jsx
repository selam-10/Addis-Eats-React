import { useState } from "react";
import PropTypes from "prop-types";

function Dish({
  name,
  price,
  spicy = false,
  currency = "ETB",
  onAdd,
}) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    onAdd();
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;

