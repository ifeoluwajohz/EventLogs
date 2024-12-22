import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

// Define the interfaces
export interface UserProfile {
  id: string;
  email: string;
  firebaseUid: string | null;
  name: string;
  role: Role;
  location: string | null;
  preferredName: string | null;
  profilePicture: string | null;
}

export interface Role {
  role: string;
}

interface AuthContextProps {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  role: Role | string;
  setRole: React.Dispatch<React.SetStateAction<Role | null>>;
  switchRole: (role: string) => Promise<void>;
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
  const [role, setRole] = useState<Role | "user">("user");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sendAuthRequestToBackend = async (url: string, idToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to authenticate with the backend");
      }

      const responseData = await response.json();
      localStorage.setItem("jwt", responseData.token);
      setUserProfile(responseData.user);

      const { location, preferredName } = responseData.user;
      navigate(!location && !preferredName ? "/extra_info" : "/questions");
    } catch (error) {
      console.error("Error sending auth request:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      if (!token){
        console.log("Token not found");
        // setUser(null)
        navigate('/')
      }

      const response = await fetch("http://localhost:5000/user/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile");
      }

      const data = await response.json();
      setUserProfile(data.user);
      console.log(data)
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:5000/user/updateUser", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const switchRole = async (newRole: string): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:5000/user/switchRole", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:role,  currentRole: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to switch role");
      }

      const responseData = await response.json();
      console.log(responseData)
      setRole(responseData.role);
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend("http://localhost:5000/user/loginUser", idToken);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend("http://localhost:5000/user/loginUser", idToken);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend("http://localhost:5000/user/loginUser", idToken);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signInWithTwitter = async (): Promise<void> => {
    try {
      const provider = new TwitterAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(userCredential.user);
      await sendAuthRequestToBackend("http://localhost:5000/user/loginUser", idToken);
    } catch (error) {
      console.error("Twitter Sign-In Error:", error);
    }
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
    localStorage.removeItem("jwt");
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        role,
        switchRole,
        setUser,
        setUserProfile,
        updateUserProfile,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithTwitter,
        fetchUserProfile,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
