import { useEffect, useRef, useState } from "react";

const WISHLIST_KEY = "user_wishlist";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState({});
  const isInitialized = useRef(false);

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    console.log("useEffect triggered to load wishlist from localStorage");

    if (isInitialized.current) return;

    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        const parsedWishlist = JSON.parse(stored);
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

  const toggleWishlistItem = (product) => {
    const id = product?.id || product?.productId;

    if (!id) {
      console.error("Invalid product passed to toggleWishlistItem:", product);
      return;
    }

    setWishlist((prev) => {
      const newList = { ...prev };
      if (newList[id]) {
        delete newList[id];
      } else {
        newList[id] = {
          ...product,
          id, // ensure `id` is set
          mainImgUrl: product.mainImgUrl || product.image || "",
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
