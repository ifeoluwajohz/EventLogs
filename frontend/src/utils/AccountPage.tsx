import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UserProfile } from "../types/userTypes";

const AccountPage: React.FC = () => {
  const { user, userProfile, fetchUserProfile, updateUserProfile, switchRole, role } = useAuth();
  const [localUserProfile, setLocalUserProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    preferredName: "",
    location: "",
  });

  useEffect(() => {
    const initializeProfile = async () => {
      if (!userProfile) {
        // await fetchUserProfile();
      }
      setLocalUserProfile(userProfile);
      setFormData({
        preferredName: userProfile?.preferredName || "",
        location: userProfile?.location || "",
      });
    };

    console.log(user?.email)

    initializeProfile();
  }, [userProfile, fetchUserProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleRoleSwitch = async () => {
    try {
      const newRole = role === "user" ? "admin" : "user"; // Dynamic role switching
      await switchRole(newRole.toUpperCase());
      alert(`Switched to ${newRole.toUpperCase()} role`);
      updateUserProfile({ role: newRole }); // Update local state for instant feedback
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  if (!localUserProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-5 md:px-12 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, {user?.displayName || "User"}!
      </h1>

      <div className="space-y-8">
        {!editMode ? (
          <div>
            <p className="text-gray-700">
              You are logged in as <strong>{role.toString().toUpperCase()}</strong>.
            </p>

            {role === "user" ? (
              <p className="text-gray-500 mt-2">
                As a user, you can browse, manage your account, and interact with available services.
              </p>
            ) : (
              <p className="text-gray-500 mt-2">
                As an admin, you have access to advanced features and management tools.
              </p>
            )}

            <button
              onClick={handleRoleSwitch}
              className="mt-4 text-blue-600 hover:text-blue-700 transition-all"
            >
              Switch to {role === "user" ? "Admin" : "User"} Account
            </button>

            <p
              onClick={() => setEditMode(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Edit Your Profile
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            {/* Editable Fields */}
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

            {/* Disabled Fields */}
            <div>
              <label className="block font-bold">Email:</label>
              <input
                type="text"
                value={localUserProfile.email}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-bold">Role:</label>
              <input
                type="text"
                value={role.toString()}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-bold">Name:</label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="border px-4 py-2 w-full rounded bg-gray-100"
              />
            </div>

            {/* Save & Cancel Buttons */}
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
      </div>
    </div>
  );
};

export default AccountPage;
