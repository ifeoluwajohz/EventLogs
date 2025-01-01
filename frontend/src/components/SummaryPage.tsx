import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { useUserFlow } from "../context/UserFlowContext";

const SummaryPage: React.FC = () => {
  const { state, syncWithBackend } = useUserFlow();
  const navigate = useNavigate(); // Initialize navigation

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleSubmit = async () => {
    syncWithBackend()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Summary</h1>
        <div className="text-left mb-6">
          <pre className="p-4 bg-gray-100 rounded-md text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
