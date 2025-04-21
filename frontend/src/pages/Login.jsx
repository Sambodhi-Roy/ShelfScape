import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/client";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  // Check for already authenticated or not 
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/auth/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200 && response.data.valid) {
            toast.success("Already logged in!");
            navigate("/");
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
          console.log("Invalid token:", error);
        }
      }
    };

    checkToken();
  }, [navigate]);




  const handlelogin = async () => {
    setAuthenticating(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); 
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      console.log("Error in login is", error);
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4 min-h-screen px-4">
      <h3
        style={{ fontFamily: "Virgil" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold"
      >
        Log In
      </h3>
      <p className="text-lg text-gray-600">You're one step away!</p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-3 border border-indigo-400 rounded-full outline-none transition duration-200 hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Email"
        type="email"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-3 border border-indigo-400 rounded-full outline-none transition duration-200 hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        type="password"
      />

      <div className="max-w-[400px] w-full mx-auto">
        <button
          onClick={handlelogin}
          className="w-full bg-accent hover:bg-indigo-800 text-white font-semibold py-3 rounded-full transition duration-200"
        >
          {authenticating ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div className="w-full max-w-[400px] flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <button
        onClick={() => toast.info("Login with Google.")}
        className="flex items-center justify-center gap-2 w-full max-w-[400px] bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-full shadow-sm transition duration-200"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Login with Google
      </button>

      <p onClick={() => navigate("/register")} className="text-center text-sm">
        Don’t have an account?{" "}
        <button
          className="text-accent font-medium hover:underline"
          onClick={() => toast.info("Redirect to sign up")}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
