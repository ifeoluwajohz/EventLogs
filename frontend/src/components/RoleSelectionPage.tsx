import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useUserFlow();

  const handleSelection = (role: string) => {
    dispatch({ type: "SET_ROLE", payload: role });
    if (role === "admin") {
      navigate("/admin-questions");
    } else {
      navigate("/attendee-questions");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md text-center">
        <h1 className="text-2xl font-bold">Are you an Admin or an Attendee?</h1>
        <div className="space-y-4 mt-4">
          <button
            onClick={() => handleSelection("admin")}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Admin
          </button>
          <button
            onClick={() => handleSelection("attendee")}
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            Attendee
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
