import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { OrbitProgress } from "react-loading-indicators";
import { Header, Footer } from "./components/componentIndex";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <OrbitProgress dense color="#3184cc" size="small" text="" textColor="" />
    </div>
  ) : (
    <div className="flex flex-wrap content-between min-h-screen bg-zinc-800 text-white">
      <div className="w-full block text-center">
        <Header />
        <main>TODO: {/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
