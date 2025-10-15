import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    buyingPrice: "",
    sellingPrice: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const r = await API.get("/products");
      setProducts(r.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
      } else {
        await API.post("/products", form);
      }
      setForm({
        name: "",
        sku: "",
        buyingPrice: "",
        sellingPrice: "",
        stock: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      sku: p.sku,
      buyingPrice: p.buyingPrice,
      sellingPrice: p.sellingPrice,
      stock: p.stock,
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-60 mt-2 md:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-6 gap-3 mb-6"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="buyingPrice"
          placeholder="Buying Price"
          value={form.buyingPrice}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`${
            editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg px-4 py-2 transition-all`}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Product Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-600">SKU: {p.sku || "—"}</p>
              <div className="mt-2 space-y-1">
                <p className="text-gray-700">Buy: ₹{p.buyingPrice}</p>
                <p className="text-gray-700">Sell: ₹{p.sellingPrice}</p>
                <p className="text-gray-700">Stock: {p.stock}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}