import { Link } from "react-router";
import { useCartStore } from "../store/cartStore.js";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="message-page empty-cart">
        <p className="eyebrow">YOUR CART</p>
        <h1>Your cart is taking a little break.</h1>
        <p>When you find something you like, it will show up here.</p>
        <Link className="primary-button" to="/products">Browse products</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR PICKS</p>
          <h1>Shopping cart</h1>
        </div>
        <span className="catalogue-total">{itemCount} items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <div className="cart-item-info">
                <h2>{item.title}</h2>
                <p>${item.price.toFixed(2)} each</p>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
                <button
                  type="button"
                  aria-label={`Decrease ${item.title} quantity`}
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase ${item.title} quantity`}
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                >+</button>
              </div>
              <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
              <button className="remove-button" type="button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-line"><span>Items</span><span>{itemCount}</span></div>
          <div className="summary-line total-line"><span>Total</span><strong>${totalPrice.toFixed(2)}</strong></div>
          <button className="secondary-button full-width" type="button" onClick={clear}>
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}
