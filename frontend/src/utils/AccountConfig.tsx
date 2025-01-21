import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignInComponent: React.FC = () => {
  const { user, loading, error, signInWithGoogle, signInWithTwitter, signUp, signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      
    }
  };


  {loading && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg mt-3">Processing...</p>
      </div>
    </div>
  )}
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {!user && (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleEmailAuth}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {isSignUp ? "Create Account" : "Log In"}
              </button>

              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition mt-4"
              >
                <img
                  className="w-5"
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  alt="Google Icon"
                />
                Continue with Google
              </button>
              <button
                onClick={signInWithTwitter}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition mt-4"
              >
                <img
                  className="w-5"
                  src="https://img.icons8.com/?size=100&id=jlpBF1fJe9fs&format=png&color=000000"
                  alt="Twitter Icon"
                />
                Continue with Twitter
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span
                    onClick={() => setIsSignUp((prev) => !prev)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInComponent;
