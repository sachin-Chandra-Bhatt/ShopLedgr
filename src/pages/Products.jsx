import React, { useEffect, useState } from "react";
import API from "../services/api";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    API.get("/products")
      .then((r) => setProducts(r.data.data))
      .catch(() => {});
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <p>Sell: ₹{p.sellingPrice}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
