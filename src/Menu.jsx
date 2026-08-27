import Dish from "./Dish";
import Card from "./Card";

function Menu({ dishes, category }) {
  const shown = dishes.filter((dish) => dish.category === category);

  if (shown.length === 0) {
    return <p>No {category} dishes found.</p>;
  }

  return (
    <div className="menu">
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} />
        </Card>
      ))}
    </div>
  );
}

export default Menu;