import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role, UserProfile } from "../types/userTypes"
import { auth } from "../config/firebaseConfig";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getIdToken,
} from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  role: Role | string;
  setRole: React.Dispatch<React.SetStateAction<Role | string>>;
  switchRole: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | string>({ role: "user" });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");


  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile();
      } else {
        setUserProfile(null);
        localStorage.removeItem("jwt");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch(`${API_URL}/user/getUser`, {
        method: "GET",
        // credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch profile");
      // }

      const data = await response.json();
      console.log(data)
      setUserProfile(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const switchRole = async (): Promise<void> => {
    try{
      const response = await fetch(`${API_URL}/user/switchRole`, {
        method: "PUT",
        // credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:userProfile?.id, currentRole: userProfile?.role.toString().toUpperCase() })

      });

      const data = await response.json();
      console.log(data)
      fetchUserProfile()
      // setUserProfile(data.user);
    }catch(err){
      console.log(err.message)
    }
  }

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend(`${API_URL}/user/register`, idToken);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend(`${API_URL}/user/loginUser`, idToken);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend(`${API_URL}/user/loginUser`, idToken);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem("jwt");
      setUser(null);
      setUserProfile(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sendAuthRequestToBackend = async (url: string, idToken: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with the backend");
      }

      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      setUserProfile(data.user);
      navigate("/accountConfig");
    } catch (error) {
      console.error("Error sending auth request:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        role,
        setRole,
        switchRole, // Implement switching roles if needed
        setUser,
        setUserProfile,
        updateUserProfile: async () => {}, // Implement updating profile if needed
        signUp,
        signIn,
        signInWithGoogle,
        signInWithTwitter: async () => {}, // Implement if needed
        fetchUserProfile,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
