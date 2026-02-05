import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://blooms-flower-shop.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Our Plants & Flowers 🌿</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
