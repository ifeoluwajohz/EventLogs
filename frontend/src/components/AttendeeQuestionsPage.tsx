import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";

const AttendeeQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUserFlow();

  const [preferredName, setPreferredName] = useState<string>(state.answers["preferredName"] || "");
  const [location, setLocation] = useState<string>(state.answers["location"] || "");
  const [categories, setCategories] = useState<string[]>([]); // Store fetched categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(state.answers["category"] || []); // Categories selected by the user
  const [customCategory, setCustomCategory] = useState<string>(""); // Custom input for categories

  // Fetch categories from backend
  useEffect(() => {
    // Replace with actual API call
    const fetchCategories = async () => {
      // Example API call
      const fetchedCategories = ["Music", "Art", "Technology", "Sports", "Food"];
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Update context when inputs change
  useEffect(() => {
    dispatch({ type: "SET_ANSWER", payload: { question: "preferredName", answer: preferredName } });
  }, [preferredName, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_ANSWER", payload: { question: "location", answer: location } });
  }, [location, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_ANSWER", payload: { question: "category", answer: selectedCategories } });
  }, [selectedCategories, dispatch]);

  // Handle category selection and typing
  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleCustomCategoryAdd = () => {
    if (customCategory && !selectedCategories.includes(customCategory)) {
      setSelectedCategories((prevCategories) => [...prevCategories, customCategory]);
      setCustomCategory(""); // Clear the input field after adding
    }
  };

  const handleNext = () => {
    navigate("/summary");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Attendee Information</h1>
        <p className="mb-6 text-gray-600">Please provide your details to continue.</p>
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
              placeholder="Enter your preferred name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              What type of events interest you the most? (Select multiple or type)
            </label>
            <div className="space-y-2">
              <select
                id="category"
                multiple
                value={selectedCategories}
                onChange={handleCategorySelect}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="flex items-center">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Or type a category"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCustomCategoryAdd}
                  className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-2">
              <span className="block text-sm text-gray-600">Selected Categories: </span>
              <ul className="list-disc pl-5">
                {selectedCategories.map((category, index) => (
                  <li key={index} className="text-sm text-gray-800">{category}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
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
