import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear cart (used after order)
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
