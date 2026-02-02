import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index}>
          <span>{item.name} — ₹{item.price}</span>
          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2>Total: ₹{total}</h2>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
