import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div className="menu">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={() => onAdd(dish)} />
        </Card>
      ))}
    </div>
  );
}

export default DishList;
