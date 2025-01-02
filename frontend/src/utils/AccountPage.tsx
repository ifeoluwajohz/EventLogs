import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UserProfile } from "../types/userTypes";
import { Link } from "react-router-dom";


const AccountPage: React.FC = () => {
  const {
    user,
    loading,
    userProfile,
    fetchUserProfile,
    updateUserProfile,
    switchRole,
    role,
    signOut
  } = useAuth();
  const [localUserProfile, setLocalUserProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    preferredName: "",
    location: "",
  });

  useEffect(() => {
    const initializeProfile = () => {
      if (!userProfile) {
        fetchUserProfile().catch((error) => console.log("Error fetching user profile:", error));
      }
      setLocalUserProfile(userProfile || null);
      setFormData({
        preferredName: userProfile?.prefferedName || "",
        location: userProfile?.location || "",
      });
    };

    initializeProfile();
  }, [userProfile, fetchUserProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      // alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Failed to update profile. Please try again.");
    }
  };

  const handleRoleSwitch = async () => {
    try {
      // const newRole = role === "user" ? "admin" : "user";
      await switchRole();
    } catch (error) {
      console.error("Error switching role:", error);
      alert("Failed to switch role. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-5 md:px-12 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome {user?.displayName || ""}!
      </h1>
      {!localUserProfile ? 
      (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>
            It seems like your profile is not fully set up. Please complete your
            profile to access all features.
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Link to='/login'>Complete Profile</Link>
          </button>
        </div>
      )
      : 
      ( <div className="space-y-8">
        {!editMode ? (
          <div>
            <p className="text-gray-700">
              You are logged in as <strong>{userProfile?.role.toString()}</strong>.
            </p>

            <p className="text-gray-500 mt-2">
              {role !== "user"
                ? "As a user, you can browse, manage your account, and interact with available services."
                : "As an admin, you have access to advanced features and management tools."}
            </p>

            <button
              onClick={handleRoleSwitch}
              className="mt-4 text-blue-600 hover:text-blue-700 transition-all"
            >
              Switch to {userProfile?.role.toString() === "USER" ? "Admin" : "User"} Account
            </button>

            <p
              onClick={() => setEditMode(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Edit Your Profile
            </p>
            <p className="mt-4">
            <Link 
            to={userProfile?.role.toString() !== "USER" ? "/admin-questions" : '/attendee-questions'}
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Manage Events
            </Link>
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block font-bold">Preferred Name:</label>
              <input
                type="text"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-bold">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block font-bold">Email:</label>
              <input
                type="text"
                value={localUserProfile.email}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold">Role:</label>
              <input
                type="text"
                value={userProfile?.role.toString().toUpperCase()}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold">Name:</label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      <button className="bg-red-500 px-6 py-2 font-bold text-gray-100 mt-2" onClick={signOut}>Log out</button>

      </div>
      )}
    </div>
  );
};

export default AccountPage;
