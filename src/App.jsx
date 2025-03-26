import { Routes, Route, Navigate } from "react-router-dom"; 
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import ModalsContainer from "./modal/ModalsContainer";
import Sidebar from "./components/Sidebar";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              <Route path="profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="saved-products" element={<PrivateRoute><SavedProducts /></PrivateRoute>} />
              <Route path="price-alerts" element={<PrivateRoute><PriceAlerts /></PrivateRoute>} />
            </Route>
          </Routes>
        </main>
      </div>
      <ModalsContainer />
    </div>
  );
}

export default App;
