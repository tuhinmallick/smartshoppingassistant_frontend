import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBestStorePrices } from "../api/authAPI";
import { FaFire, FaShippingFast } from "react-icons/fa";
import Button from "../components/ui/Button";
import logoMap from "../components/ui/logoMap";
import { ArrowRight } from "lucide-react";

// Store search URL fallback map
const storeSearchUrls = {
  Amazon: (productName) =>
    `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`,
  Flipkart: (productName) =>
    `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`,
  eBay: (productName) =>
    `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productName)}`,
  Otto: (productName) =>
    `https://www.otto.de/suche/${encodeURIComponent(productName)}`,
  MediaMarkt: (productName) =>
    `https://www.mediamarkt.de/de/search.html?searchTerm=${encodeURIComponent(
      productName
    )}`,
};

const ProductDetails = ({ onSave }) => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  const [storage, setStorage] = useState("128");
  const [color, setColor] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const paymentIcons = {
    Visa: "💳",
    MasterCard: "💳",
    PayPal: "🅿️",
    ApplePay: "🍎",
    GooglePay: "🅶",
    COD: "💵",
    UPI: "📱",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!name || !storage) return;

      try {
        const payload = {
          productName: name,
          storage,
          ...(color && { color }),
          page,
          limit,
        };

        const response = await fetchBestStorePrices(payload);
        const sorted = response.sort((a, b) => a.price - b.price);

        setProducts(sorted);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, storage, color, page]);

  return (
    <div className="w-auto p-6 bg-[#fef6e4] mb-6 shadow-xl shadow-gray-300">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Storage"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className="p-2 border shadow-md shadow-gray-400"
        />
        <input
          type="text"
          placeholder="Color (optional)"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-2 border shadow-md shadow-gray-400"
        />
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : error ? (
        <div className="text-center text-[#fc372d]">{error}</div>
      ) : (
        <>
          {products.length > 0 && (
            <div className="p-6 mb-10 flex flex-col md:flex-row items-center">
              <img
                src={products[0].mainImgUrl}
                alt={products[0].name}
                className="w-64 h-64 object-contain rounded-xl"
              />
              <div className="md:ml-8 mt-4 md:mt-0 space-y-2 text-center md:text-left">
                <h3 className="text-4xl font-extrabold uppercase text-[#fc372d] mb-2">
                  {decodedName || products[0]?.name}
                </h3>
                <p className="font-extrabold text-[#464646] mt-2">
                  Storage: {products[0].storage_gb} GB
                </p>
                <p className="font-extrabold text-[#464646]">
                  Color: {products[0].color || "N/A"}
                </p>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-extrabold uppercase text-[#fc372d] mb-4">
            Available at Stores
          </h2>
          <div className="space-y-6">
            {products.map((product, idx) => {
              const storeName = product?.SellerStore?.Store?.name || "";
              const storeLogo = logoMap[storeName];

              const offerLink =
                product.product_link ||
                (storeSearchUrls[storeName]
                  ? storeSearchUrls[storeName](decodedName)
                  : "#");

              return (
                <div
                  key={idx}
                  className="bg-white shadow-xl shadow-black border p-6 flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="flex flex-col gap-2 md:w-2/3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {storeLogo && (
                        <div className="flex justify-center mb-2">
                          <img
                            src={storeLogo}
                            alt={`${storeName} logo`}
                            className="w-20 h-auto object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm text-yellow-500">
                        ⭐ {product.storeRating || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#464646]">
                      <FaShippingFast />
                      <p className="text-[#464646]">
                        Shipping: {product.shippingCost || "Standard"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#464646]">
                      <FaFire className="text-[#fc372d]" />
                      <p className="text-[#464646]">
                        Discount: {product.discount || "0%"} {product.currency}
                      </p>
                    </div>

                    <div className="text-sm text-[#464646]">
                      <p>
                        Payment Methods:{" "}
                        <span className="text-2xl">
                          {product.payment_methods?.length > 0
                            ? product.payment_methods
                                .map((method) => paymentIcons[method] || method)
                                .join(" ")
                            : `${paymentIcons["Visa"]} ${paymentIcons["PayPal"]} ${paymentIcons["COD"]}`}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:w-1/3 text-center">
                    <p className="text-xl font-bold text-[#fc372d] mb-2">
                      {product.price} {product.currency}
                    </p>
                    <div className="mt-4">
                      <a
                        href={offerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          text="To Offer"
                          icon={<ArrowRight className="w-5 h-5" />}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {products.length >= limit && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPage(page + 1)}
                className="bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
