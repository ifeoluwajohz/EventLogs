import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";

const AttendeeQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setEvent, addCategory, setSelectedCategories } = useUserFlow();

  const [location, setLocation] = useState<string>(state.event["location"] || "");
  const [customCategory, setCustomCategory] = useState<string>("");

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleCustomCategoryAdd = () => {
    if (customCategory && !state.categories.includes(customCategory)) {
      addCategory(customCategory);
      setCustomCategory("");
    }
  };

  const handleNext = () => {
    setEvent("location", location);
    navigate("/summary");
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Attendee Information</h1>
        <form className="space-y-5">
          <div className="my-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Your Current Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Event Category You Love Most
            </label>
            <select
              id="category"
              multiple
              value={state.selectedCategories}
              onChange={handleCategorySelect}
              className="mt-1 w-full px-4 py-2 border rounded"
            >
              {state.categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Custom category"
                className="px-4 py-2 border rounded"
              />
              <button
                type="button"
                onClick={handleCustomCategoryAdd}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex justify-between">
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

export default AttendeeQuestionsPage;
