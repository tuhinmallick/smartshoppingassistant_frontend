import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/UserDashboard";
import ProfilePage from "./pages/ProfilePage";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-products" element={<SavedProducts />} />
          <Route path="/price-alert" element={<PriceAlerts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
