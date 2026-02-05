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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { toggleView } = useSelector((state) => state.menu);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen max-w-screen bg-gray-100">
        <Navbar />
        <main
          className={`${toggleView ? "lg:w-10/12" : "lg:w-full"} ml-15 md:ml-0 w-full h-full`}
        >
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
    </QueryClientProvider>
  );
}

export default App;
