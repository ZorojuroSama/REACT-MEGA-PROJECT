import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import AuthService from "./appwrite/auth";
import { login, logout } from "./redux store/authSlice";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>React Blog App with Appwrite</h1>
    </>
  );
}

export default App;
