import React, { useState } from "react";
import API from "../services/api";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        const r = await API.get("/auth/profile");
        setUser(r.data.data.user);
      } else {
        // REGISTER
        await API.post("/auth/register", form);
        alert("Registered successfully! You can now login.");
        setIsLogin(true); // switch to login form after registration
        setForm({ name: "", email: "", password: "", companyName: "" }); // reset form
      }
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            className="border p-2 w-full mb-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {!isLogin && (
          <input
            name="companyName"
            placeholder="Company Name"
            className="border p-2 w-full mb-4"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        )}

        <button className={`w-full px-4 py-2 rounded ${isLogin ? "bg-blue-600" : "bg-green-600"} text-white`}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
