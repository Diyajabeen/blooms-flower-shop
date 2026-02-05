import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    await fetch("http://blooms:flower-shop.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        totalAmount: total,
        customerName: name,
        address
      })
    });

    clearCart();
    alert("Order placed successfully 🌷");
  };

  return (
    <div>
      <h1>Checkout</h1>

      <input
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Delivery Address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <h2>Total: ₹{total}</h2>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;
