import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import API from "./services/api";

function App() {
  const [user, setUser] = useState(null);

  // Optional: check if user is already logged in on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.data.user);
      } catch (err) {
        setUser(null); // not logged in
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div>
      {user ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
          <p className="mb-4">Role: {user.role}</p>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default App;
