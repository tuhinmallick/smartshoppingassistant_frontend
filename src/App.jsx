import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import ModalsContainer from "./modal/ModalsContainer";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
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
            path="/price-alerts"
            element={
              <PrivateRoute>
                <PriceAlerts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <ModalsContainer />
    </div>
  );
}

export default App;
