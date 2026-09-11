function Checkout({ order }) {
  const total = order.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>

      {order.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {order.map((dish, index) => (
            <p key={`${dish.id}-${index}`}>
              {dish.name} - {dish.price} ETB
            </p>
          ))}

          <h3>Total: {total} ETB</h3>
        </>
      )}
    </div>
  );
}

export default Checkout;