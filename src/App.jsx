import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex flex-grow">
          <Sidebar /> {/* Sidebar on the left */}
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
