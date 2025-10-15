import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import API from "./services/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <Router>
      {user ? (
        <div className="min-h-screen bg-gray-100">
          {/* Navbar */}
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">ShopLedger</h1>
            <div className="flex gap-4 items-center">
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Products
              </Link>
              <button
                onClick={async () => {
                  await API.post("/auth/logout");
                  setUser(null);
                }}
                className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </nav>

          {/* Routes */}
          <div className="p-6">
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}