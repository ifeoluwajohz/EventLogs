import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { auth } from "../config/firebaseConfig";

const SignInComponent: React.FC = () => {
  const { user, loading, signInWithGoogle, signInWithTwitter , signUp, signIn } = useAuth();
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
      if (error instanceof Error) {
        console.error("Authentication error:", error);
        alert(error.message || "Authentication failed");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        {!user &&  (
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
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <button
                onClick={signInWithGoogle}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mt-4"
              >
                Continue with Google
              </button>
              <button
                onClick={signInWithTwitter}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-4"
              >
                Continue with Twitter
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  <span
                    onClick={() => setIsSignUp((prev) => !prev)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    {isSignUp ? " Sign In" : " Sign Up"}
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
