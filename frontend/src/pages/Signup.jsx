import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/client";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  const handleregister = async () => {
    setRegistering(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Register successful!");
        const token = response.data.token;
        console.log(" token from backend is ",token);
        navigate("/genre");
      }

    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
      console.log("Error in registration is", error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4 min-h-screen px-4">
      <h3
        style={{ fontFamily: "Virgil" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold"
      >
        Sign Up
      </h3>
      <p className="text-lg text-gray-600">Let's get started!</p>


      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-3 border border-indigo-400 rounded-full outline-none transition duration-200 hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Username"
        type="text"
      />

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
        placeholder="Set a Password"
        type="password"
      />

      <div className="max-w-[400px] w-full mx-auto">
        <button
          onClick={handleregister}
          className="w-full bg-accent hover:bg-indigo-800 text-white font-semibold py-3 rounded-full transition duration-200"
        >
          {registering ? "Registering..." : "Sign Up"}
        </button>
      </div>

      {/* Divider line */}
      <div className="w-full max-w-[400px] flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Sign Up Button */}
      <button
        onClick={() => toast.info("Register with Google.")}
        className="flex items-center justify-center gap-2 w-full max-w-[400px] bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-full shadow-sm transition duration-200"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign up with Google
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={() => {
            toast.info("Redirecting to Login");
            navigate("/genre");
          }}
          className="text-accent font-medium hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Signup;
