import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserAuthentication from "./auth/UserAuthentication";
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

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return user ? children : <Navigate to="/userauthentication" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/userauthentication"
              element={<UserAuthentication />}
            />
            <Route
              path="/login"
              element={<Navigate to="/userauthentication" replace />}
            />
            <Route
              path="/signup"
              element={<Navigate to="/userauthentication" replace />}
            />
            <Route path="/search" element={<SearchResults />} /> {/* Search Results */}
            <Route path="/product/:id" element={<ProductDetails />} /> {/* Product Details */}
            <Route path="/brand/:brand" element={<BrandDetails />} /> {/* Brand Details */}
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
      </Router>
    </AuthProvider>
  );
}

export default App;
