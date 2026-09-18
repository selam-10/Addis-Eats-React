
import useCartStore from "./store/cartStore";
import DeliveryForm from "./DeliveryForm";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((dish, index) => (
            <div key={`${dish.id}-${index}`}>
              <p>
                {dish.name} - {dish.price} ETB
              </p>

              <button onClick={() => remove(dish.id)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: {total} ETB</h3>

          <button onClick={clear}>
            Clear Cart
          </button>

          <hr />

          <DeliveryForm total={total} />
        </>
      )}
    </div>
  );
}

export default Checkout;
