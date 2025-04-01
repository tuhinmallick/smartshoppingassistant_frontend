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
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Chatbot from "./components/Chatbot"; // Import Chatbot component

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/userauthentication" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
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
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetails />} />
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
          </Route>
        </Routes>
        {/* Chatbot is visible on all pages */}
        <Chatbot />
      </Router>
    </AuthProvider>
  );
}

export default App;
