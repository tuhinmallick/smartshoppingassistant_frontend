import { useEffect, useRef, useState } from "react";

const WISHLIST_KEY = "user_wishlist";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState({});
  const isInitialized = useRef(false);

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    console.log("useEffect triggered to load wishlist from localStorage");

    // Prevent multiple initializations
    if (isInitialized.current) return;

    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        const parsedWishlist = JSON.parse(stored);
        // Ensure the wishlist is stored as an object
        if (
          typeof parsedWishlist === "object" &&
          !Array.isArray(parsedWishlist)
        ) {
          setWishlist(parsedWishlist);
        } else {
          console.error("Wishlist data is not an object:", parsedWishlist);
        }
      } catch (err) {
        console.error("Failed to parse wishlist:", err);
      }
    }

    isInitialized.current = true;
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving wishlist to localStorage:", wishlist);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Add/remove product from wishlist
  const toggleWishlistItem = (product) => {
    setWishlist((prev) => {
      const newList = { ...prev };
      if (newList[product.id]) {
        // If the product is already in the wishlist, remove it
        delete newList[product.id];
      } else {
        // Otherwise, add the product to the wishlist
        newList[product.id] = {
          ...product,
          mainImgUrl: product.mainImgUrl || product.image || "", // Ensure product image is available
        };
      }
      return newList;
    });
  };

  // Check if a product is in the wishlist
  const isInWishlist = (id) => !!wishlist[id];

  return {
    wishlist,
    toggleWishlistItem,
    isInWishlist,
  };
};

export default useWishlist;
