import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";

function Menu({ dishes }) {
  const [category, setCategory] = useState("Main");
  const [order, setOrder] = useState([]);

  const categories = ["Main", "Side", "Drink", "Dessert"];

  const shown = dishes.filter((dish) => dish.category === category);

  const handleAdd = (dish) => {
    setOrder([...order, dish]);
  };

  const total = order.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <div>
      <CategoryBar
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <DishList
        dishes={shown}
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
