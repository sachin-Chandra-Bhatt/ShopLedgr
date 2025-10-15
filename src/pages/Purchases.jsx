import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Purchases() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", quantity: 1, supplier: "" });
  const [purchases, setPurchases] = useState([]);

  const load = async () => {
    const [prodRes, purRes] = await Promise.all([
      API.get("/products"),
      API.get("/purchases"),
    ]);
    setProducts(prodRes.data.data);
    setPurchases(purRes.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const buyingPrice =
        products.find((p) => p._id === form.productId)?.buyingPrice || 0;
      await API.post("/purchases", { ...form, buyingPrice });
      alert("✅ Purchase added");
      load();
    } catch (err) {
      alert("❌ Error while adding purchase");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Purchases</h2>

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
          placeholder="Supplier Name"
          value={form.supplier}
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Purchase
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Purchase History</h3>
        <ul>
          {purchases.map((p) => (
            <li key={p._id}>
              {p.quantity} × {p.product?.name} from {p.supplier}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}