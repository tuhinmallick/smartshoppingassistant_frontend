import React from "react";
import { useParams } from "react-router-dom";
import { fetchLiveProductData } from "../api/authAPI"; // Make sure to import the API function

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetchLiveProductData(id); // Adjust the API call as needed
        const productData = response?.products?.[0]; // Assuming response has product data in an array
        if (productData) {
          setProduct(productData);
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-600">Product Not Found</h2>
          <p className="mt-2 text-gray-700">
            Sorry, this product does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-gray-400 p-8 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="mt-4 w-full h-96 object-cover rounded-lg"
        />
        <p className="mt-4 text-lg font-semibold text-blue-700">
          {product.description}
        </p>
        <p className="mt-2 text-lg font-bold text-red-600">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
