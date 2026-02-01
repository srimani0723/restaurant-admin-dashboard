import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import OrderManagement from "./pages/OrderManagement";
import MenuSearch from "./pages/MenuSearch";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  const { toggleView } = useSelector((state) => state.menu);

  return (
    <div className="flex min-h-screen min-w-screen bg-gray-100">
      <Navbar />
      <main className={`${toggleView ? "lg:w-9/12" : "lg:w-11/12"} w-full `}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/search" element={<MenuSearch />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
