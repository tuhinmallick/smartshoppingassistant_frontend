import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import SavedProducts from "./Pages/SavedProducts.jsx";
import PriceAlerts from "./Pages/PriceAlerts.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import BrandDetails from "./Pages/BrandDetails.jsx";
import Loader from "./components/Loader";

// PrivateRoute component to protect private pages
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000); // Change duration as per requirement
    return () => clearTimeout(timer);
  }, []);

  const handleLoaderFinish = () => {
    setIsLoading(false); // Set isLoading to false after loader animation is complete
  };

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        {isLoading ? (
          <Loader onFinish={handleLoaderFinish} />
        ) : (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:name" element={<ProductDetails />} />
              <Route path="/notifications" element={<PriceAlerts />} />
              <Route path="/brand/:brand" element={<BrandDetails />} />

              {/* Private Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/saved-products"
                element={
                  <PrivateRoute>
                    <SavedProducts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/price-alert"
                element={
                  <PrivateRoute>
                    <PriceAlerts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
