const PRODUCTS_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal) {
  const response = await fetch(`${PRODUCTS_URL}?limit=100`, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products (HTTP ${response.status}).`);
  }

  const result = await response.json();
  if (!Array.isArray(result.products)) {
    throw new Error("The product service returned an invalid response.");
  }

  return result.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, { signal });

  if (response.status === 404) {
    throw new Error("Product not found.");
  }
  if (!response.ok) {
    throw new Error(`Unable to load this product (HTTP ${response.status}).`);
  }

  return response.json();
}
