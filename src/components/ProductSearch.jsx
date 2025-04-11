// ProductSearch.jsx
import React, { useState, useEffect } from "react";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change for search
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/search?query=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.product ? [data.product] : []);
      } else {
        setError("Product not found or scraping in progress.");
      }
    } catch (err) {
      setError("Error fetching product data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for Products</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter product name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.brand}</p>
              {/* Render other product details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
