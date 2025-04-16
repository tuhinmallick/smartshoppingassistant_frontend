import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchLiveProductData } from "../api/authAPI";
import DealsGrid from "../components/DealsGrid";
import useWishlist from "../hooks/useWishlist";
import SearchForm from "../components/SearchForm";
import ProductGrid from "../components/ProductGrid";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const decodedQuery = decodeURIComponent(query).trim();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { toggleWishlistItem, isInWishlist } = useWishlist();

  const handleViewDetails = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`, {
      state: {
        productId: product.id,
        productLink: product.product_link,
      },
    });
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!decodedQuery || decodedQuery.toLowerCase() === "undefined") {
        console.warn("Query is empty or undefined — skipping fetch.");
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetchLiveProductData(decodedQuery);
        const products = Array.isArray(response?.products)
          ? response.products
          : response
          ? [response]
          : [];

        const flatResults = products.flatMap((product) =>
          product.Prices?.map((price) => ({
            id: price.id,
            productId: product.id,
            name: product.name,
            brand: product.brand,
            mainImgUrl: price.mainImgUrl,
            price: price.price,
            currency: price.currency,
            discount:
              parseFloat(price.discount) > 0
                ? `Save ${price.discount}${price.currency}`
                : null,
            shippingCost: price.shippingCost,
            availability: price.availability,
            color: price.color,
            ram_gb: price.ram_gb,
            storage_gb: price.storage_gb,
            seller: price?.SellerStore?.Seller?.name || "Unknown Seller",
            storeRating: price?.SellerStore?.rating,
            link: price.product_link,
            description: `Color: ${price.color || "N/A"}, RAM: ${
              price.ram_gb
            }GB, Storage: ${price.storage_gb}GB`,
            Store: price?.SellerStore?.Store?.name || "",
          }))
        );

        setResults(flatResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [decodedQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 mt-16 w-full">
      <section className="w-full flex justify-center py-8">
        <SearchForm />
      </section>

      <section className="w-full py-12 text-center px-4">
        <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
          Search Results for{" "}
          <span className="text-[#464646]">"{decodedQuery}"</span>
        </h2>
        {results.length === 0 ? (
          <p className="text-xl text-[#464646]">No products found.</p>
        ) : (
          <DealsGrid
            products={results}
            onSave={toggleWishlistItem}
            isInWishlist={isInWishlist} // Pass isInWishlist here
            isWishlist={false}
            onViewDetails={handleViewDetails} // ✅ pass it to ProductCard
          />
        )}
      </section>

      <section className="w-full py-12 text-center px-4">
        <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
          Hottest Offers
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full mt-16">
            <ProductGrid />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
