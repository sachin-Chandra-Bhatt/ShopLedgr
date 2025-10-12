import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import API from "./services/api";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    API.get("/auth/profile")
      .then((r) => setUser(r.data.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}
