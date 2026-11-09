import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchProduct } from "../api/productsApi.js";
import useFetch from "../hooks/useFetch.js";
import { useCartStore } from "../store/cartStore.js";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, loading, error } = useFetch(fetchProduct, [productId]);
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAddedToCart(true);
  }

  if (loading) {
    return <p className="state-message" role="status">Loading product…</p>;
  }

  if (error || !product) {
    const notFound = error?.toLowerCase().includes("not found");
    return (
      <section className="message-page">
        <p className="eyebrow">{notFound ? "PRODUCT NOT FOUND" : "PRODUCT UNAVAILABLE"}</p>
        <h1>{notFound ? "That item isn't here." : "We couldn't load this item."}</h1>
        <p>{error || "The requested product could not be found."}</p>
        <button className="primary-button" type="button" onClick={() => navigate("/products")}>
          Back to products
        </button>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <button className="back-button" type="button" onClick={() => navigate("/products")}>
        <span aria-hidden="true">←</span> Back to products
      </button>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <button className="primary-button" type="button" onClick={handleAddToCart}>
            Add to cart
          </button>
          {addedToCart && <p className="success-message" role="status">Added to your cart.</p>}
        </div>
      </div>
    </section>
  );
}
