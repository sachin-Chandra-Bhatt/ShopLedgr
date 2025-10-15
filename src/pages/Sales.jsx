import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    customerEmail: "",
    customerName: "",
  });

  const load = async () => {
    const [prodRes, saleRes] = await Promise.all([
      API.get("/products"),
      API.get("/sales"),
    ]);
    setProducts(prodRes.data.data);
    setSales(saleRes.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sales", form);
      alert("✅ Sale recorded");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error while recording sale");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sales</h2>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
        <select
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 w-full mb-2"
          placeholder="Quantity"
        />

        <input
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Customer Email"
          value={form.customerEmail}
          onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Record Sale
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Sales</h3>
        <ul>
          {sales.map((s) => (
            <li key={s._id}>
              {s.quantity} × {s.product?.name} — ₹{s.total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}