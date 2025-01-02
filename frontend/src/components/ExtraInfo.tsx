import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";

const ExtraInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useUserFlow();

  const [preferredName, setPreferredName] = useState<string>(state.preferredName || "");

  const handleNext = () => {
    // setpreferredName(preferredName);
    navigate("/questions");
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Extra Information</h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="preferredName" className="block text-sm font-medium text-gray-700">
              Preferred Name
            </label>
            <input
              id="preferredName"
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExtraInfoPage;
