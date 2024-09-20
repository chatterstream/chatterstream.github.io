import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeController from "../components/ThemeController";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/chat"); // Arahkan ke halaman chat jika terautentikasi
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi username dan password (misalnya: username: "user", password: "pass")
    if (username === "user" && password === "pass") {
      // Simpan status login di localStorage
      localStorage.setItem("isAuthenticated", "true");
      navigate("/chat"); // Redirect ke halaman chat setelah login
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <>
      <ThemeController />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <h1 className="text-5xl mb-10">
          <span className="font-extrabold">Chatter</span>
          <span className="font-thin">Stream</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="btn w-full">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
