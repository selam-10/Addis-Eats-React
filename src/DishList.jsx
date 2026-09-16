import Dish from "./Dish";

function DishList({ dishes }) {
  if (!dishes || dishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          currency={dish.currency}
        />
      ))}
    </div>
  );
}

export default DishList;