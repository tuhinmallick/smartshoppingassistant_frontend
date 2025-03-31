import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Animation from "./ui/Animation"; // Replaces separate login and signup pages
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/animation" />; // Redirect to the new Auth page
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/animation" element={<Animation />} />
            {/* Redirect /login and /signup to /auth */}
            <Route
              path="/login"
              element={<Navigate to="/animation" replace />}
            />
            <Route
              path="/signup"
              element={<Navigate to="/animation" replace />}
            />
            {/* New Login/Signup Page */}
            <Route path="search" element={<SearchResults />} />
            <Route path="product/:id" element={<ProductDetails />} />
            {/* Protected Routes */}
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
      </Router>
    </AuthProvider>
  );
}

export default App;
