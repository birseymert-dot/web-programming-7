import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-card-link" to={`/products/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </div>
        <div className="product-card-content">
          <span className="category-label">{product.category}</span>
          <h2>{product.title}</h2>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <span className="view-product">View product <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
