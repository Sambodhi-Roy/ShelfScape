import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false); // Placeholder

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
        <button className="w-full bg-accent hover:bg-indigo-800 text-white font-semibold py-3 rounded-full transition duration-200">
          {authenticating ? "Submitting" : "Submit"}
        </button>
      </div>

      {/* Divider line */}
      <div className="w-full max-w-[400px] flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={() => console.log("Login with Google")} // Replace with actual handler
        className="flex items-center justify-center gap-2 w-full max-w-[400px] bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-full shadow-sm transition duration-200"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Login with Google
      </button>

      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <button
          className="text-accent font-medium hover:underline"
          onClick={() => {
            console.log("Redirect to Signup page");
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
