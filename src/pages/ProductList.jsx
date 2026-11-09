import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/productsApi.js";
import ProductCard from "../components/ProductCard.jsx";
import useFetch from "../hooks/useFetch.js";

export default function ProductList() {
  const { data: products, loading, error } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";

  const categories = products
    ? [...new Set(products.map((product) => product.category))].sort()
    : [];

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = (products ?? []).filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <section className="catalogue-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h1>Shop all products</h1>
        </div>
        {products && <span className="catalogue-total">{products.length} items</span>}
      </div>

      <div className="filter-bar">
        <label className="search-field" htmlFor="product-search">
          <span aria-hidden="true">⌕</span>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => updateFilter("q", event.target.value)}
            placeholder="Search by product title"
          />
        </label>

        <label className="category-field" htmlFor="product-category">
          <span>Category</span>
          <select
            id="product-category"
            value={selectedCategory}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="state-message" role="status">Loading products…</p>}
      {!loading && error && <p className="state-message error-message" role="alert">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="state-message">
          <p>No products match these filters.</p>
          <button className="text-button" type="button" onClick={() => setSearchParams({})}>
            Clear filters
          </button>
        </div>
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <p className="result-summary" aria-live="polite">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
